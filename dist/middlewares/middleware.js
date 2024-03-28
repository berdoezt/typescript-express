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
exports.authenticationMiddleware = void 0;
const util_1 = require("../utils/util");
function authenticationMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                throw new Error("unauthorized");
            }
            const token = authorizationHeader.split("Bearer ")[1];
            const payload = yield (0, util_1.verifyJwtToken)(token);
            if (!payload) {
                throw new Error("unauthorized");
            }
            req.app.locals.userId = payload.sub;
            next();
        }
        catch (e) {
            res.status(401).json({
                error: "unauthorized"
            });
        }
    });
}
exports.authenticationMiddleware = authenticationMiddleware;
