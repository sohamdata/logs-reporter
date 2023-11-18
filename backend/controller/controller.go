package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"sohamdata/log-ingestor/models"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func HandleLogSearch(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := r.URL.Query()

	filter := bson.M{}

	// for key, values := range params {
	// 	if len(values) > 0 {
	// 		filter[key] = values[0]
	// 	}
	// }

	for key, values := range params {
		if len(values) > 0 {
			// Use a case-insensitive regular expression for string fields
			if key == "message" || key == "level" || key == "resourceId" || key == "traceId" || key == "spanId" || key == "commit" || key == "parentResourceId" {
				filter[key] = bson.M{"$regex": primitive.Regex{Pattern: values[0], Options: "i"}}
			} else {
				filter[key] = values[0]
			}
		}
	}

	logs, err := searchLogs(filter)
	if err != nil {
		http.Error(w, "Failed to retrieve logs", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(logs)
}

func searchLogs(filter bson.M) ([]models.Log, error) {
	var logs []models.Log

	cursor, err := collection.Find(context.Background(), filter, options.Find())
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	err = cursor.All(context.Background(), &logs)
	if err != nil {
		return nil, err
	}

	return logs, nil
}
