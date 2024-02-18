package controller

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
)

var conn *pgx.Conn

func init() {
	envFile, _ := godotenv.Read(".env")

	var err error
	conn, err = pgx.Connect(context.Background(), envFile["PG_URL"])
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	var greeting string
	err = conn.QueryRow(context.Background(), "select 'Hello, world!'").Scan(&greeting)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Println(greeting)
}

func HandleHome(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the Log Ingestor API!")
}

// func HandleLogIngestion(w http.ResponseWriter, r *http.Request) {
// 	// implement the ingestion logic
// 	fmt.Fprintf(w, "post req")

// }

// func HandleLogSearch(w http.ResponseWriter, r *http.Request) {
// 	// implement the search logic
// 	fmt.Fprintf(w, "get req")

// }

// func searchLogs(w http.ResponseWriter, r *http.Request) []models.Log {
// 	// implement the search logic
// 	fmt.Fprintf(w, "get method helper")
// }
