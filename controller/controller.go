package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"sohamdata/log-ingestor/models"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB_URL string
var DB_NAME string
var COL_NAME string

var collection *mongo.Collection

func init() {
	envFile, _ := godotenv.Read(".env")

	DB_URL = envFile["DB_URL"]
	DB_NAME = envFile["DB_NAME"]
	COL_NAME = envFile["COL_NAME"]

	clientOptions := options.Client().ApplyURI(DB_URL)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// defer client.Disconnect(context.Background())

	fmt.Println("Connected to MongoDB!")

	collection = client.Database(DB_NAME).Collection(COL_NAME)

	fmt.Println("Collection instance created!")
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

	result, err := collection.InsertOne(context.TODO(), logEntry)

	if err != nil {
		log.Println("Error inserting log entry into the database:", err)
		http.Error(w, "Failed to insert log entry into the database", http.StatusInternalServerError)
		return
	}

	log.Println("Inserted document ID:", result.InsertedID)
}
