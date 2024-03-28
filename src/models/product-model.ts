export interface ProductModel {
    id: number
    name: string
    price: number
}

export interface GetProductResponse {
    id: number
    name: string
    price: number
}

export interface CreateProductRequest {
    name: string
    price: number
}

export interface CreateProductResponse {
    id: number
}