package main

import "gorm.io/gorm"

type Sale struct {
	Id          int64   `json:"id,omitempty"`
	ArticleId   int64   `json:"articleId"`
	Code        string  `json:"code"`
	Description string  `json:"description"`
	Fob         float64 `json:"fob"`
	Price       float64 `json:"price"`
	Qty         float64 `json:"qty,omitempty"`
}

func (app *App) Sale(sales []Sale) error {
	db := GetConnection()

	return db.Transaction(func(tx *gorm.DB) error {
		for _, sale := range sales {
			if err := tx.Create(&sale).Error; err != nil {
				return err
			}

			if err := tx.Model(&Article{}).Where("id = ?", sale.ArticleId).Update("stock", gorm.Expr("stock - ?", sale.Qty)).Error; err != nil {
				return err
			}
		}

		return nil
	})
}
