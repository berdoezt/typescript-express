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
exports.ProductService = void 0;
class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.getAll();
            let getProductsResponse = [];
            products.forEach((product) => {
                getProductsResponse.push({
                    id: product.id,
                    name: product.name,
                    price: product.price
                });
            });
            return getProductsResponse;
        });
    }
    create(createProductRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdProductId = yield this.productRepository.create({
                id: 0,
                name: createProductRequest.name,
                price: createProductRequest.price
            });
            return {
                id: createdProductId
            };
        });
    }
}
exports.ProductService = ProductService;
