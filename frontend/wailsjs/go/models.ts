export namespace main {
	
	export class Article {
	    id: number;
	    code: string;
	    description: string;
	    stock: number;
	    fob: number;
	    price: number;
	    qty?: number;
	
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
	        this.qty = source["qty"];
	    }
	}
	export class Sale {
	    Id: number;
	    Code: string;
	    Description: string;
	    Fob: number;
	    Price: number;
	    Qty: number;
	
	    static createFrom(source: any = {}) {
	        return new Sale(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Code = source["Code"];
	        this.Description = source["Description"];
	        this.Fob = source["Fob"];
	        this.Price = source["Price"];
	        this.Qty = source["Qty"];
	    }
	}

}

