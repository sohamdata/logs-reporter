package router

import (
	"github.com/gorilla/mux"

	"sohamdata/log-ingestor/controller"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/api/go/logger", controller.HandleHome).Methods("GET")
	// router.HandleFunc("/api/go/logger/logs", controller.HandleLogSearch).Methods("GET")
	router.HandleFunc("/api/go/logger/logs", controller.HandleShowLogs).Methods("GET")
	router.HandleFunc("/api/go/logger/submitlog", controller.HandleLogIngestion).Methods("POST")

	return router
}
