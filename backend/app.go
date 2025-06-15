package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type CreateOrderRequest struct {
	Items           []OrderItemRequest `json:"items"`
	ShippingAddress ShippingAddress    `json:"shipping_address"`
}

type OrderItemRequest struct {
	Product  string `json:"product"`
	Quantity int    `json:"quantity"`
}

type App struct {
	db *Database
}

func NewApp() *App {
	db, err := NewDatabase("stringart.db")
	if err != nil {
		log.Fatalf("error connecting to DB: %v", err)
	}
	return &App{db: db}
}

// Product handlers
func (app *App) GetProducts(c *gin.Context) {
	products, err := app.db.ListProducts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}

func (app *App) GetProduct(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}
	product, err := app.db.GetProduct(id)
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

	// Calculate total amount and validate products
	var totalAmount float64
	for _, item := range req.Items {
		product, err := app.db.GetProductByKey(item.Product)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid product key: %s", item.Product)})
			return
		}
		totalAmount += product.Price * float64(item.Quantity)
	}

	// Create order
	now := time.Now()
	orderID, err := app.db.CreateOrder(totalAmount, now)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	// Insert order items
	for _, item := range req.Items {
		product, _ := app.db.GetProductByKey(item.Product) // We already validated this above
		if err := app.db.AddOrderItem(orderID, product.ID, product.Price, item.Quantity); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order items"})
			return
		}
	}

	// Insert shipping address
	if err := app.db.AddShippingAddress(orderID, req.ShippingAddress); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create shipping address"})
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
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid order ID"})
		return
	}
	err = app.db.UpdateOrderPaymentDone(id, now)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Payment acknowledged"})
}

func (app *App) GetOrder(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid order ID"})
		return
	}
	order, err := app.db.GetOrder(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}

	items, err := app.db.GetOrderItems(order.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	address, err := app.db.GetShippingAddress(order.ID)
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

// Add new method for root route
func (app *App) GetHome(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"app": "StringArt"})
}

func (app *App) SetupRoutes(r *gin.Engine) {
	// Root route
	r.GET("/", app.GetHome)

	// Products API
	r.GET("/products", app.GetProducts)
	r.GET("/products/:id", app.GetProduct)

	// Orders API
	r.POST("/orders", app.PostOrder)
	r.PUT("/aorders/:id/payment-done", app.PutOrderPaymentDone)
	r.GET("/orders/:id", app.GetOrder)
}

func runServer(port string) {
	app := NewApp()
	r := gin.Default()

	app.SetupRoutes(r)

	r.Run(":" + port)
}
