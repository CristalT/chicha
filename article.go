package main

type Article struct {
	Id          int64   `json:"id,omitempty"`
	Code        string  `json:"code"`
	Description string  `json:"description"`
	Stock       int     `json:"stock"`
	Fob         float32 `json:"fob"`
	Price       float32 `json:"price"`
}

func (app *App) CreateArticle(a Article) error {
	db := GetConnection()
	return db.Create(&a).Error
}

func (app *App) UpdateArticle(a Article) error {
	db := GetConnection()
	return db.Save(&a).Error
}

type Querier interface {
	GetByTerms(terms string) ([]Article, error)
}

func (app *App) GetArticles(orderBy string, orderType string, terms string) ([]Article, error) {
	db := GetConnection()

	var articles []Article

	return articles, db.Where("code = ?", terms).Or("description LIKE ?", "%"+terms+"%").Order(orderBy + " " + orderType).Find(&articles).Error
}
