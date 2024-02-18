package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sohamdata/log-ingestor/models"

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
	// defer conn.Close(context.Background())

	var greeting string
	err = conn.QueryRow(context.Background(), "select 'Connected to postgres'").Scan(&greeting)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error establishing connection to database: %v\n", err)
		os.Exit(1)
	}

	fmt.Println(greeting)
}

func HandleHome(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the Log Ingestor API!")
}

func HandleLogIngestion(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var logEntry models.Log

	err := json.NewDecoder(r.Body).Decode(&logEntry)
	if err != nil {
		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err := createLogsTableIfNotExists(); err != nil {
		log.Println("Error creating logs table:", err)
		http.Error(w, "Failed to create logs table", http.StatusInternalServerError)
		return
	}

	var sqlQuery string = `
        INSERT INTO logs (level, message, resourceId, timestamp, traceId, spanId, commit, parentResourceId)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `
	_, err = conn.Exec(context.Background(), sqlQuery, logEntry.Level, logEntry.Message, logEntry.ResourceID, logEntry.Timestamp, logEntry.TraceID, logEntry.SpanID, logEntry.Commit, logEntry.Metadata.ParentResourceID)
	if err != nil {
		log.Println("Error inserting log entry into the database:", err)
		http.Error(w, "Failed to insert log entry into the database", http.StatusInternalServerError)
		return
	}

	log.Println("Inserted log entry into PostgreSQL!")
}

func createLogsTableIfNotExists() error {
	createTableQuery := `
        CREATE TABLE IF NOT EXISTS logs (
            ID SERIAL PRIMARY KEY,
            level TEXT,
            message TEXT,
            resourceId TEXT,
            timestamp TIMESTAMP,
            traceId TEXT,
            spanId TEXT,
            commit TEXT,
            parentResourceId TEXT
        );
    `

	_, err := conn.Exec(context.Background(), createTableQuery)
	if err != nil {
		return err
	}
	return nil
}

func HandleShowLogs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var logs []models.Log

	rows, err := conn.Query(context.Background(), "SELECT * FROM logs")
	if err != nil {
		log.Println("Error querying the database for logs:", err)
		http.Error(w, "Failed to retrieve logs from the database", http.StatusInternalServerError)
		return
	}

	for rows.Next() {
		var logEntry models.Log
		err = rows.Scan(&logEntry.ID, &logEntry.Level, &logEntry.Message, &logEntry.ResourceID, &logEntry.Timestamp, &logEntry.TraceID, &logEntry.SpanID, &logEntry.Commit, &logEntry.Metadata.ParentResourceID)
		if err != nil {
			log.Println("Error scanning the database for logs:", err)
			http.Error(w, "Failed to retrieve logs from the database", http.StatusInternalServerError)
			return
		}
		logs = append(logs, logEntry)
	}

	json.NewEncoder(w).Encode(logs)
}
