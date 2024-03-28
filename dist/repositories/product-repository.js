"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
class ProductRepository {
    constructor(db) {
        this.db = db;
    }
    getAll() {
        return new Promise((resolve, reject) => {
            const q = "select * from products";
            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                let products = [];
                for (let i = 0; i < rows.length; i++) {
                    products.push({
                        id: rows[i].id,
                        name: rows[i].name,
                        price: rows[i].price
                    });
                }
                resolve(products);
            });
        });
    }
    getById(productId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT * from products where id = ${productId}`;
            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (rows.length == 0) {
                    reject(new Error("data not found"));
                    return;
                }
                resolve({
                    id: rows[0].id,
                    name: rows[0].name,
                    price: rows[0].price
                });
            });
        });
    }
    create(productModel) {
        return new Promise((resolve, reject) => {
            const q = `INSERT INTO products(name, price) values('${productModel.name}', ${productModel.price})`;
            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.insertId);
            });
        });
    }
}
exports.ProductRepository = ProductRepository;
