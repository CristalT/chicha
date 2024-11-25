package main

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
	return db.Create(&a).Error
}

func (app *App) UpdateArticle(a Article) error {
	db := GetConnection()
	return db.Save(&a).Error
}

func (app *App) GetArticles(orderBy string, orderType string, terms string) ([]Article, error) {
	db := GetConnection()
	db.Order(orderBy + " " + orderType)
	if terms != "" {
		db.Where("code = ? OR description LIKE ?", terms, "%"+terms+"%")
	}
	var articles []Article
	return articles, db.Find(&articles).Error
}
