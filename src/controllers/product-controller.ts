import express from 'express';
import { ProductService } from "../services/product-service";
import { CreateProductRequest } from '../models/product-model';

export class ProductController {
    private productService: ProductService

    constructor(productService: ProductService) {
        this.productService = productService
    }

    getAll = async (req: express.Request, res: express.Response) => {
        try {
            const getProductsResponse = await this.productService.getAll()

            res.status(200).json({
                data: getProductsResponse
            })
        } catch (e) {
            let errorMessage = "server error"

            if (e instanceof Error) {
                errorMessage = e.message
            }

            res.status(500).json({
                error: errorMessage
            })
        }
    }

    create = async (req: express.Request, res: express.Response) => {
        try {
            const createProductRequest = req.body as CreateProductRequest
            const createProductResponse = await this.productService.create(createProductRequest)

            res.status(200).json({
                data: createProductResponse
            })
        } catch (e) {
            let errorMessage = "server error"

            if (e instanceof Error) {
                errorMessage = e.message
            }

            res.status(500).json({
                error: errorMessage
            })
        }
    }
}