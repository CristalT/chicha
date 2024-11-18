package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func GetConnection() *sql.DB {
	if db != nil {
		return db
	}

	var err error
	db, err = sql.Open("sqlite3", "data.sqlite")
	if err != nil {
		panic(err)
	}
	return db
}

func createArticlesTable() error {
	db := GetConnection()
	q := `CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code VARCHAR(30) NOT NULL,
            description VARCHAR(200) NOT NULL,
            stock FLOAT DEFAULT 0 NOT NULL,
			fob FLOAT DEFAULT 0 NOT NULL,
			price FLOAT DEFAULT 0 NOT NULL
         );`
	_, err := db.Exec(q)
	if err != nil {
		return err
	}
	return nil
}

func createSalesTable() error {
	db := GetConnection()
	q := `CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code VARCHAR(30) NOT NULL,
            description VARCHAR(200) NOT NULL,
			fob FLOAT DEFAULT 0 NOT NULL,
			price FLOAT DEFAULT 0 NOT NULL,
			qty FLOAT DEFAULT 0 NOT NULL,
			date DATETIME DEFAULT CURRENT_TIMESTAMP
         );`
	_, err := db.Exec(q)
	if err != nil {
		return err
	}
	return nil
}

func MakeMigrations() {
	createArticlesTable()
	createSalesTable()
}
