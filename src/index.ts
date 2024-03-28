import express from 'express'
import { mysqlConnection } from './lib/database'
import { ProductController } from './controllers/product-controller'
import { ProductService } from './services/product-service'
import { ProductRepository } from './repositories/product-repository'
import { UserController } from './controllers/user-controller'
import { UserService } from './services/user-service'
import { UserRepository } from './repositories/user-repository'
import { OrderRepository } from './repositories/order-repository'
import { OrderService } from './services/order-service'
import { OrderController } from './controllers/order-controller'
import { authenticationMiddleware } from './middlewares/middleware'

async function startServer() {
    try {
        const db = await mysqlConnection()

        const productRepository = new ProductRepository(db)
        const productService = new ProductService(productRepository)
        const productController = new ProductController(productService)

        const userRepository = new UserRepository(db)
        const userService = new UserService(userRepository)
        const userController = new UserController(userService)

        const orderRepository = new OrderRepository(db)
        const orderService = new OrderService(orderRepository, productRepository)
        const orderController = new OrderController(orderService)

        const app = express()
        app.use(express.json())

        const userRouter = express.Router()
        userRouter.post("/users/register", userController.register)
        userRouter.post("/users/login", userController.login)

        const productRouter = express.Router()
        productRouter.use(authenticationMiddleware)
        productRouter.get("/products", productController.getAll)
        productRouter.post("/products", productController.create)

        const orderRouter = express.Router()
        orderRouter.use(authenticationMiddleware)
        orderRouter.get("/orders", orderController.getAllByUserId)
        orderRouter.post("/orders", orderController.create)

        app.use(userRouter)
        app.use(productRouter)
        app.use(orderRouter)
        app.listen(8082, () => {
            console.log("server running")
        })
    } catch (e) {
        console.error("failed to start server :", e)
        process.exit(1)
    }
}

startServer()

