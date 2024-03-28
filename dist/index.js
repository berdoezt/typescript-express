"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./lib/database");
const product_controller_1 = require("./controllers/product-controller");
const product_service_1 = require("./services/product-service");
const product_repository_1 = require("./repositories/product-repository");
const user_controller_1 = require("./controllers/user-controller");
const user_service_1 = require("./services/user-service");
const user_repository_1 = require("./repositories/user-repository");
const order_repository_1 = require("./repositories/order-repository");
const order_service_1 = require("./services/order-service");
const order_controller_1 = require("./controllers/order-controller");
const middleware_1 = require("./middlewares/middleware");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield (0, database_1.mysqlConnection)();
            const productRepository = new product_repository_1.ProductRepository(db);
            const productService = new product_service_1.ProductService(productRepository);
            const productController = new product_controller_1.ProductController(productService);
            const userRepository = new user_repository_1.UserRepository(db);
            const userService = new user_service_1.UserService(userRepository);
            const userController = new user_controller_1.UserController(userService);
            const orderRepository = new order_repository_1.OrderRepository(db);
            const orderService = new order_service_1.OrderService(orderRepository, productRepository);
            const orderController = new order_controller_1.OrderController(orderService);
            const app = (0, express_1.default)();
            app.use(express_1.default.json());
            const userRouter = express_1.default.Router();
            userRouter.post("/users/register", userController.register);
            userRouter.post("/users/login", userController.login);
            const productRouter = express_1.default.Router();
            productRouter.use(middleware_1.authenticationMiddleware);
            productRouter.get("/products", productController.getAll);
            productRouter.post("/products", productController.create);
            const orderRouter = express_1.default.Router();
            orderRouter.use(middleware_1.authenticationMiddleware);
            orderRouter.get("/orders", orderController.getAllByUserId);
            orderRouter.post("/orders", orderController.create);
            app.use(userRouter);
            app.use(productRouter);
            app.use(orderRouter);
            app.listen(8082, () => {
                console.log("server running");
            });
        }
        catch (e) {
            console.error("failed to start server :", e);
            process.exit(1);
        }
    });
}
startServer();
