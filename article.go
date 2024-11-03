package main

import (
	"errors"
)

type Article struct {
	Id          int64   `json:"id"`
	Code        string  `json:"code"`
	Description string  `json:"description"`
	Stock       int     `json:"stock"`
	Fob         float32 `json:"fob"`
	Price       float32 `json:"price"`
	Qty         *int    `json:"qty,omitempty"`
}

func (app *App) CreateArticle(a Article) error {
	db := GetConnection()

	q := `INSERT INTO articles (code, description, stock, fob, price) VALUES (?, ?, ?, ?, ?)`

	stmt, err := db.Prepare(q)

	if err != nil {
		return err
	}

	defer stmt.Close()

	r, err := stmt.Exec(a.Code, a.Description, a.Stock, a.Fob, a.Price)

	if err != nil {
		return err
	}

	if i, err := r.RowsAffected(); err != nil || i != 1 {
		return errors.New("ERROR al guardar")
	}

	return nil
}

func (app *App) Sale(articles []Article) error {
	db := GetConnection()

	insertSQL := `INSERT INTO sales (code, description, fob, price, qty) VALUES (?, ?, ?, ?, ?)`
	insertSaleStmt, err := db.Prepare(insertSQL)
	if err != nil {
		return err
	}
	defer insertSaleStmt.Close()

	updateStockSQL := `UPDATE articles SET stock = (stock - ?) WHERE id = ?`
	updateStockStmt, err := db.Prepare(updateStockSQL)
	if err != nil {
		return err
	}
	defer updateStockStmt.Close()

	for _, article := range articles {
		if _, err := insertSaleStmt.Exec(article.Code, article.Description, article.Fob, article.Price, article.Qty); err != nil {
			return err
		}

		if _, err := updateStockStmt.Exec(article.Qty, article.Id); err != nil {
			return err
		}
	}

	return nil
}

func (app *App) GetArticles(orderBy string, orderType string, terms string) ([]Article, error) {

	db := GetConnection()

	var query string

	if terms == "" {
		query = "SELECT * FROM articles ORDER BY " + orderBy + " " + orderType
	} else {
		query = "SELECT * FROM articles WHERE code = '" + terms + "' OR description LIKE '%" + terms + "%' ORDER BY " + orderBy + " " + orderType
	}

	rows, err := db.Query(query)

	if err != nil {
		return []Article{}, err
	}

	defer rows.Close()

	articles := []Article{}

	for rows.Next() {
		var a Article

		if err := rows.Scan(
			&a.Id,
			&a.Code,
			&a.Description,
			&a.Stock,
			&a.Fob,
			&a.Price,
		); err != nil {
			return articles, err
		}

		articles = append(articles, a)
	}

	return articles, nil
}
