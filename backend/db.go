package main

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

// Database represents the database connection and operations
type Database struct {
	db *sqlx.DB
}

// NewDatabase creates a new Database instance
func NewDatabase(dbFilename string) (*Database, error) {
	db, err := sqlx.Connect("sqlite3", dbFilename)
	if err != nil {
		return nil, fmt.Errorf("error connecting to database: %v", err)
	}
	return &Database{db: db}, nil
}

// Models
type Product struct {
	ID          int       `json:"id" db:"id"`
	Key         string    `json:"key" db:"key"`
	Name        string    `json:"name" db:"name"`
	Description string    `json:"description" db:"description"`
	Price       float64   `json:"price" db:"price"`
	Active      bool      `json:"active" db:"active"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
}

type OrderItem struct {
	ProductID int     `json:"product_id" db:"product_id"`
	Price     float64 `json:"price" db:"price"`
	Quantity  int     `json:"quantity" db:"quantity"`
}

type ShippingAddress struct {
	Name    string `json:"name"`
	Street  string `json:"street"`
	City    string `json:"city"`
	State   string `json:"state"`
	Pincode string `json:"pincode"`
	Phone   string `json:"phone"`
}

type Order struct {
	ID                int            `json:"id" db:"id"`
	TotalAmount       float64        `json:"total_amount" db:"total_amount"`
	PaymentDone       bool           `json:"payment_done" db:"payment_done"`
	PaymentDoneAt     sql.NullTime   `json:"payment_done_at" db:"payment_done_at"`
	PaymentReceived   bool           `json:"payment_received" db:"payment_received"`
	PaymentReceivedAt sql.NullTime   `json:"payment_received_at" db:"payment_received_at"`
	Comments          sql.NullString `json:"comments" db:"comments"`
	CreatedAt         time.Time      `json:"created_at" db:"created_at"`
	UpdatedAt         time.Time      `json:"updated_at" db:"updated_at"`
}

type OrderWithShipping struct {
	Order
	ShippingAddress
	Items []OrderItemWithProduct `db:"-"`
}

type OrderItemWithProduct struct {
	OrderItem
	ProductKey  string `db:"product_key"`
	ProductName string `db:"product_name"`
}

// YAML structures for loading products
type ProductYAML struct {
	Key         string  `yaml:"key"`
	Name        string  `yaml:"name"`
	Description string  `yaml:"description"`
	Price       float64 `yaml:"price"`
	Active      bool    `yaml:"active"`
}

type ProductsYAML struct {
	Products []ProductYAML `yaml:"products"`
}

// GetShippingAddress returns the shipping address for this order
func (o *Order) GetShippingAddress(db *Database) (*ShippingAddress, error) {
	return db.GetShippingAddress(o.ID)
}

func (db *Database) ListProducts() ([]Product, error) {
	var products []Product
	err := db.db.Select(&products, `
		SELECT id, key, name, description, price, active, created_at, updated_at 
		FROM products 
		ORDER BY name`)
	if err != nil {
		return nil, fmt.Errorf("error listing products: %v", err)
	}
	return products, nil
}

func (db *Database) GetProduct(id int) (*Product, error) {
	var product Product
	err := db.db.Get(&product, "SELECT * FROM products WHERE id = ? AND active = true", id)
	if err != nil {
		return nil, fmt.Errorf("error getting product: %v", err)
	}
	return &product, nil
}

func (db *Database) GetProductByKey(key string) (*Product, error) {
	var product Product
	err := db.db.Get(&product, "SELECT * FROM products WHERE key = ? AND active = true", key)
	if err != nil {
		return nil, fmt.Errorf("error getting product: %v", err)
	}
	return &product, nil
}

func (db *Database) CreateOrder(totalAmount float64, now time.Time) (int, error) {
	result, err := db.db.Exec(`
		INSERT INTO orders (total_amount, payment_done, payment_received, created_at, updated_at)
		VALUES (?, false, false, ?, ?)`,
		totalAmount, now, now)
	if err != nil {
		return 0, fmt.Errorf("error creating order: %v", err)
	}

	orderID, err := result.LastInsertId()
	if err != nil {
		return 0, fmt.Errorf("error getting order ID: %v", err)
	}
	return int(orderID), nil
}

func (db *Database) AddOrderItem(orderID int, productID int, price float64, quantity int) error {
	_, err := db.db.Exec(`
		INSERT INTO order_items (order_id, product_id, price, quantity)
		VALUES (?, ?, ?, ?)`,
		orderID, productID, price, quantity)
	if err != nil {
		return fmt.Errorf("error adding order item: %v", err)
	}
	return nil
}

func (db *Database) AddShippingAddress(orderID int, address ShippingAddress) error {
	_, err := db.db.Exec(`
		INSERT INTO shipping_addresses (order_id, name, street, city, state, pincode, phone)
		VALUES (?, ?, ?, ?, ?, ?, ?)`,
		orderID, address.Name, address.Street,
		address.City, address.State,
		address.Pincode, address.Phone)
	if err != nil {
		return fmt.Errorf("error adding shipping address: %v", err)
	}
	return nil
}

func (db *Database) UpdateOrderPaymentDone(orderID int, now time.Time) error {
	result, err := db.db.Exec(`
		UPDATE orders 
		SET payment_done = true, payment_done_at = ?, updated_at = ?
		WHERE id = ?`,
		now, now, orderID)
	if err != nil {
		return fmt.Errorf("error updating order payment: %v", err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error checking rows affected: %v", err)
	}
	if rows == 0 {
		return fmt.Errorf("order not found")
	}
	return nil
}

func (db *Database) GetOrder(orderID int) (*Order, error) {
	var order Order
	err := db.db.Get(&order, "SELECT * FROM orders WHERE id = ?", orderID)
	if err != nil {
		return nil, fmt.Errorf("error getting order: %v", err)
	}
	return &order, nil
}

func (db *Database) GetOrderItems(orderID int) ([]OrderItem, error) {
	var items []OrderItem
	err := db.db.Select(&items, "SELECT * FROM order_items WHERE order_id = ?", orderID)
	if err != nil {
		return nil, fmt.Errorf("error getting order items: %v", err)
	}
	return items, nil
}

func (db *Database) GetShippingAddress(orderID int) (*ShippingAddress, error) {
	var address ShippingAddress
	err := db.db.Get(&address, "SELECT * FROM shipping_addresses WHERE order_id = ?", orderID)
	if err != nil {
		return nil, fmt.Errorf("error getting shipping address: %v", err)
	}
	return &address, nil
}

func (db *Database) ListOrders() ([]OrderWithShipping, error) {
	var orders []OrderWithShipping
	err := db.db.Select(&orders, `
		SELECT o.*, s.name, s.street, s.city, s.state, s.pincode, s.phone
		FROM orders o
		LEFT JOIN shipping_addresses s ON o.id = s.order_id
		ORDER BY o.id DESC`)
	if err != nil {
		return nil, fmt.Errorf("error listing orders: %v", err)
	}

	// Fetch order items for each order
	for i := range orders {
		var items []OrderItemWithProduct
		err := db.db.Select(&items, `
			SELECT oi.product_id, oi.price, oi.quantity, p.key as product_key, p.name as product_name
			FROM order_items oi
			JOIN products p ON oi.product_id = p.id
			WHERE oi.order_id = ?`, orders[i].ID)
		if err != nil {
			return nil, fmt.Errorf("error getting order items: %v", err)
		}
		orders[i].Items = items
	}

	return orders, nil
}
