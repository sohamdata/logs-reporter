package router

import (
	"github.com/gorilla/mux"

	"sohamdata/log-ingestor/controller"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/submitlog", controller.HandleLogIngestion).Methods("POST")
	router.HandleFunc("/logs", controller.HandleLogSearch).Methods("GET")

	return router
}
