import { CreateProductRequest, CreateProductResponse, GetProductResponse } from "../models/product-model";
import { ProductRepository } from "../repositories/product-repository";

export class ProductService {
    private productRepository: ProductRepository

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async getAll(): Promise<GetProductResponse[]> {
        const products = await this.productRepository.getAll()

        let getProductsResponse: GetProductResponse[] = []
        products.forEach((product) => {
            getProductsResponse.push({
                id: product.id,
                name: product.name,
                price: product.price
            })
        })

        return getProductsResponse
    }

    async create(createProductRequest: CreateProductRequest): Promise<CreateProductResponse> {
        const createdProductId = await this.productRepository.create({
            id: 0,
            name: createProductRequest.name,
            price: createProductRequest.price
        })

        return {
            id: createdProductId
        }
    }
}