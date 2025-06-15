package main

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	"gopkg.in/yaml.v3"
)

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

func (app *App) LoadProducts(filename string) error {
	// Read YAML file
	data, err := os.ReadFile(filename)
	if err != nil {
		return fmt.Errorf("error reading products file: %v", err)
	}

	// Parse YAML
	var productsYAML ProductsYAML
	if err := yaml.Unmarshal(data, &productsYAML); err != nil {
		return fmt.Errorf("error parsing products file: %v", err)
	}

	// Start transaction
	tx, err := app.db.Beginx()
	if err != nil {
		return fmt.Errorf("error starting transaction: %v", err)
	}
	defer tx.Rollback()

	// Insert or update products
	for _, p := range productsYAML.Products {
		_, err := tx.Exec(`
			INSERT OR REPLACE INTO products (key, name, description, price, active, updated_at)
			VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
			p.Key, p.Name, p.Description, p.Price, p.Active)
		if err != nil {
			return fmt.Errorf("error upserting product %s: %v", p.Key, err)
		}
	}

	// Commit transaction
	if err := tx.Commit(); err != nil {
		return fmt.Errorf("error committing transaction: %v", err)
	}

	return nil
}

func (app *App) ListProducts() ([]Product, error) {
	var products []Product
	err := app.db.Select(&products, `
		SELECT id, key, name, description, price, active, created_at, updated_at 
		FROM products 
		ORDER BY name`)
	if err != nil {
		return nil, fmt.Errorf("error listing products: %v", err)
	}
	return products, nil
}
