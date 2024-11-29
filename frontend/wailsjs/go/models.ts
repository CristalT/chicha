export namespace main {
	
	export class Article {
	    id?: number;
	    code: string;
	    description: string;
	    stock: number;
	    fob: number;
	    price: number;
	
	    static createFrom(source: any = {}) {
	        return new Article(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.code = source["code"];
	        this.description = source["description"];
	        this.stock = source["stock"];
	        this.fob = source["fob"];
	        this.price = source["price"];
	    }
	}
	export class Sale {
	    id?: number;
	    articleId: number;
	    code: string;
	    description: string;
	    fob: number;
	    price: number;
	    qty?: number;
	
	    static createFrom(source: any = {}) {
	        return new Sale(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.articleId = source["articleId"];
	        this.code = source["code"];
	        this.description = source["description"];
	        this.fob = source["fob"];
	        this.price = source["price"];
	        this.qty = source["qty"];
	    }
	}

}

