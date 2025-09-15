package models

import (
	"database/sql"
)

type Artikel struct {
	ID int `json:"id"`
	Title string `json:"title"`
	Author string `json:"author"`
	Genre string `json:"genre"`
	PublishedAt string `json:"publishedAt"`
	Synopsis string `json:"synopsis"`
}

func GetAllArtikel(db *sql.DB) ([]Artikel, error) {
	rows, err := db.Query(`
		SELECT id, title, author, genre, published_at, synopsis
		FROM articles
		ORDER BY published_at DESC;
		`)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var articles []Artikel

	for rows.Next() {
		var a Artikel
		err := rows.Scan(&a.ID, &a.Title, &a.Author, &a.Genre, &a.PublishedAt, &a.Synopsis)
		if err != nil {
			return nil, err
		}
		articles = append(articles, a)
	}

	return articles, nil
}
