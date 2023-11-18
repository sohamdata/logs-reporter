package router

import (
	"github.com/gorilla/mux"

	"sohamdata/log-ingestor/controller"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/logs", controller.HandleLogIngestion).Methods("POST")

	return router
}
