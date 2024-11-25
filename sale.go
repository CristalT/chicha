package main

type Sale struct {
	Id          int
	Code        string
	Description string
	Fob         float64
	Price       float64
	Qty         float64
}

func (app *App) Sale(sales []Sale) error {
	db := GetConnection()
	return db.Create(&sales).Error
}
