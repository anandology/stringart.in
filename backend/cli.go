package main

import (
	"fmt"
	"log"
	"os"

	"github.com/olekukonko/tablewriter"
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "stringart",
	Short: "String Art Order Processing System",
}

var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "Start the API server",
	Run: func(cmd *cobra.Command, args []string) {
		port := cmd.Flag("port").Value.String()
		fmt.Printf("Starting server on port %s...\n", port)
		runServer(port)
	},
}

var listProductsCmd = &cobra.Command{
	Use:   "list-products",
	Short: "List all products",
	Run: func(cmd *cobra.Command, args []string) {
		app := NewApp()
		products, err := app.db.ListProducts()
		if err != nil {
			fmt.Printf("Error: %v\n", err)
			os.Exit(1)
		}

		data := [][]string{}

		for _, p := range products {
			data = append(data, []string{
				p.Key,
				p.Name,
				fmt.Sprintf("₹%.2f", p.Price)})
		}
		// Create table using new tablewriter API
		table := tablewriter.NewTable(os.Stdout)
		table.Header("Key", "Name", "Price")
		table.Bulk(data)
		table.Render()
	},
}

var loadProductsCmd = &cobra.Command{
	Use:   "load-products [yaml-file]",
	Short: "Load products from a YAML file",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		app := NewApp()
		filename := args[0]

		fmt.Printf("Loading products from %s...\n", filename)
		err := app.db.LoadProducts(filename)
		if err != nil {
			fmt.Printf("Error: %v\n", err)
			os.Exit(1)
		}

		fmt.Println("Products loaded successfully!")
	},
}

func init() {
	serverCmd.Flags().StringP("port", "p", "8080", "Port to run the server on")
	rootCmd.AddCommand(serverCmd)
	rootCmd.AddCommand(listProductsCmd)
	rootCmd.AddCommand(loadProductsCmd)
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		log.Fatal(err)
	}
}
