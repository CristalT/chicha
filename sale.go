package main

type Sale struct {
	Id          int     `json:"id"`
	Code        string  `json:"code"`
	Description string  `json:"description"`
	Fob         float64 `json:"fob"`
	Price       float64 `json:"price"`
	Qty         float64 `json:"qty,omitempty"`
}

func (app *App) Sale(sales []Sale) error {
	db := GetConnection()
	return db.Create(&sales).Error
}
