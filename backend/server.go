package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

type CreateOrderRequest struct {
	Items           []OrderItem     `json:"items"`
	ShippingAddress ShippingAddress `json:"shipping_address"`
}

type App struct {
	db *sqlx.DB
}

func NewApp() *App {
	db, err := sqlx.Connect("sqlite3", "stringart.db")
	if err != nil {
		log.Fatalf("error connecting to DB: %v", err)
	}
	return &App{db: db}
}

// Product handlers
func (app *App) GetProducts(c *gin.Context) {
	var products []Product
	err := app.db.Select(&products, "SELECT * FROM products WHERE active = true")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}

func (app *App) GetProduct(c *gin.Context) {
	var product Product
	err := app.db.Get(&product, "SELECT * FROM products WHERE id = ? AND active = true", c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}
	c.JSON(http.StatusOK, product)
}

// Order handlers
func (app *App) PostOrder(c *gin.Context) {
	var req CreateOrderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Start transaction
	tx, err := app.db.Beginx()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
		return
	}
	defer tx.Rollback()

	// Calculate total amount and validate products
	var totalAmount float64
	for _, item := range req.Items {
		var product Product
		err := tx.Get(&product, "SELECT * FROM products WHERE id = ? AND active = true", item.ProductID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
			return
		}
		totalAmount += product.Price * float64(item.Quantity)
	}

	// Create order
	now := time.Now()
	result, err := tx.Exec(`
		INSERT INTO orders (total_amount, payment_done, payment_received, created_at, updated_at)
		VALUES (?, false, false, ?, ?)`,
		totalAmount, now, now)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	orderID, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get order ID"})
		return
	}

	// Insert order items
	for _, item := range req.Items {
		_, err := tx.Exec(`
			INSERT INTO order_items (order_id, product_id, price, quantity)
			VALUES (?, ?, ?, ?)`,
			orderID, item.ProductID, item.Price, item.Quantity)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order items"})
			return
		}
	}

	// Insert shipping address
	_, err = tx.Exec(`
		INSERT INTO shipping_addresses (order_id, name, street, city, state, pincode, phone)
		VALUES (?, ?, ?, ?, ?, ?, ?)`,
		orderID, req.ShippingAddress.Name, req.ShippingAddress.Street,
		req.ShippingAddress.City, req.ShippingAddress.State,
		req.ShippingAddress.Pincode, req.ShippingAddress.Phone)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create shipping address"})
		return
	}

	// Commit transaction
	if err := tx.Commit(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	// Generate QR code for payment (placeholder)
	qrCode := fmt.Sprintf("upi://pay?pa=your-upi-id&pn=StringArt&am=%.2f&tr=%d", totalAmount, orderID)

	c.JSON(http.StatusCreated, gin.H{
		"id":              orderID,
		"total_amount":    totalAmount,
		"payment_qr_code": qrCode,
		"created_at":      now,
	})
}

func (app *App) PutOrderPaymentDone(c *gin.Context) {
	now := time.Now()
	result, err := app.db.Exec(`
		UPDATE orders 
		SET payment_done = true, payment_done_at = ?, updated_at = ?
		WHERE id = ?`,
		now, now, c.Param("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	rows, err := result.RowsAffected()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if rows == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Payment acknowledged"})
}

func (app *App) GetOrder(c *gin.Context) {
	var order Order
	err := app.db.Get(&order, "SELECT * FROM orders WHERE id = ?", c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}

	var items []OrderItem
	err = app.db.Select(&items, "SELECT * FROM order_items WHERE order_id = ?", order.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var address ShippingAddress
	err = app.db.Get(&address, "SELECT * FROM shipping_addresses WHERE order_id = ?", order.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"order":            order,
		"items":            items,
		"shipping_address": address,
	})
}

func runServer(port string) {
	app := NewApp()
	r := gin.Default()

	// Products API
	r.GET("/api/products", app.GetProducts)
	r.GET("/api/products/:id", app.GetProduct)

	// Orders API
	r.POST("/api/orders", app.PostOrder)
	r.PUT("/api/orders/:id/payment-done", app.PutOrderPaymentDone)
	r.GET("/api/orders/:id", app.GetOrder)

	r.Run(":" + port)
}
