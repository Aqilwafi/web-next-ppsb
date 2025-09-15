package main

import (
	"log"
	"net/http"
	"backend/config"
	"backend/routes"
	"github.com/rs/cors"
)

func main() {
    db, err := config.ConnectDB()
    if err != nil {
        log.Fatal("DB error:", err)
    }
    defer db.Close()

    mux := http.NewServeMux()
    routes.SetupRoutes(mux, db)

    mux.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))

    handler := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:3000"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Content-Type"},
        AllowCredentials: true,
    }).Handler(mux)

    log.Println("Routes sudah disetup, backend jalan di :4000")
    log.Fatal(http.ListenAndServe(":4000", handler))
}
