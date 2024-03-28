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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
class OrderController {
    constructor(orderService) {
        this.getAllByUserId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllOrdersResponse = yield this.orderService.getAllByUserId(req.app.locals.userId);
                res.status(200).json({
                    data: getAllOrdersResponse
                });
            }
            catch (e) {
                let errorMessage = "server error";
                if (e instanceof Error) {
                    errorMessage = e.message;
                }
                res.status(500).json({
                    error: errorMessage
                });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createOrderRequest = req.body;
                const createOrderResponse = yield this.orderService.create(createOrderRequest, req.app.locals.userId);
                res.status(200).json({
                    data: createOrderResponse
                });
            }
            catch (e) {
                let errorMessage = "server error";
                if (e instanceof Error) {
                    errorMessage = e.message;
                }
                res.status(500).json({
                    error: errorMessage
                });
            }
        });
        this.orderService = orderService;
    }
}
exports.OrderController = OrderController;
