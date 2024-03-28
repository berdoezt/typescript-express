import { CreateOrderRequest, CreateOrderResponse, GetAllOrdersResponse } from "../models/order-model";
import { OrderRepository } from "../repositories/order-repository";
import { ProductRepository } from "../repositories/product-repository";

export class OrderService {
    private orderRepository: OrderRepository
    private productRepository: ProductRepository

    constructor(orderRepository: OrderRepository, productRepository: ProductRepository) {
        this.orderRepository = orderRepository
        this.productRepository = productRepository
    }

    async getAllByUserId(userId: number): Promise<GetAllOrdersResponse[]> {
        const orders = await this.orderRepository.getAllByUserId(userId)

        let getAllOrdersResponse: GetAllOrdersResponse[] = []
        orders.forEach((order) => {
            getAllOrdersResponse.push({
                id: order.id,
                price: order.price,
                userId: order.userId,
                productId: order.productId
            })
        })

        return getAllOrdersResponse
    }

    async create(createOrderRequest: CreateOrderRequest, userId: number): Promise<CreateOrderResponse> {
        const product = await this.productRepository.getById(createOrderRequest.productId)
        const createdOrderId = await this.orderRepository.create({
            id: 0,
            userId: userId,
            productId: product.id,
            price: createOrderRequest.price
        })

        return {
            id: createdOrderId
        }
    }
}