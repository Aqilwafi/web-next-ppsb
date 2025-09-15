package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"backend/models"
)

func GetArtikel(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		
		listArtikel, err := models.GetAllArtikel(db)
		if err != nil {
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(listArtikel)
	}
}