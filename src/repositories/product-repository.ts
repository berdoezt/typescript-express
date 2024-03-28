import mysql from 'mysql'
import { ProductModel } from '../models/product-model'

export class ProductRepository {
    private db: mysql.Connection

    constructor(db: mysql.Connection) {
        this.db = db
    }

    getAll(): Promise<ProductModel[]> {
        return new Promise<ProductModel[]>((resolve, reject) => {
            const q = "select * from products"
            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err)
                    return
                }

                let products: ProductModel[] = []

                for (let i = 0; i < rows.length; i++) {
                    products.push({
                        id: rows[i].id,
                        name: rows[i].name,
                        price: rows[i].price
                    })
                }

                resolve(products)
            })
        })
    }

    getById(productId: number): Promise<ProductModel> {
        return new Promise<ProductModel>((resolve, reject) => {
            const q = `SELECT * from products where id = ${productId}`
            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err)
                    return
                }

                if (rows.length == 0) {
                    reject(new Error("data not found"))
                    return
                }

                resolve({
                    id: rows[0].id,
                    name: rows[0].name,
                    price: rows[0].price
                })
            })
        })
    }

    create(productModel: ProductModel): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const q = `INSERT INTO products(name, price) values('${productModel.name}', ${productModel.price})`
            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err)
                    return
                }

                resolve(rows.insertId)
            })
        })
    }
}