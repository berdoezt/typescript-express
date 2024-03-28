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
exports.ProductController = void 0;
class ProductController {
    constructor(productService) {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getProductsResponse = yield this.productService.getAll();
                res.status(200).json({
                    data: getProductsResponse
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
                const createProductRequest = req.body;
                const createProductResponse = yield this.productService.create(createProductRequest);
                res.status(200).json({
                    data: createProductResponse
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
        this.productService = productService;
    }
}
exports.ProductController = ProductController;
