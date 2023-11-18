package main

import (
	"fmt"
	"log"
	"net/http"
	"sohamdata/log-ingestor/router"

	"github.com/rs/cors"
)

func main() {
	r := router.Router()

	handler := cors.Default().Handler(r)

	fmt.Println("Server is hopefully starting at port 3000")
	log.Fatal(http.ListenAndServe(":3000", handler))
}
