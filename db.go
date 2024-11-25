package main

import (
	_ "github.com/mattn/go-sqlite3"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GetConnection() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("data.sqlite"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	return db
}

func MakeMigrations() {
	db := GetConnection()
	db.AutoMigrate(&Article{})
	db.AutoMigrate(&Sale{})
}
