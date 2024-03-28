"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJwtToken(userId) {
    return new Promise((resolve, reject) => {
        const currentDate = new Date();
        const fiveMinutesLater = currentDate.setMinutes(currentDate.getMinutes() + 5);
        const payload = {
            sub: userId,
            exp: Math.floor(fiveMinutesLater / 1000)
        };
        jsonwebtoken_1.default.sign(payload, "in1_53crEt_54yAAAA", (err, token) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(token);
        });
    });
}
exports.generateJwtToken = generateJwtToken;
function verifyJwtToken(token) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, "in1_53crEt_54yAAAA", (err, payload) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(payload);
        });
    });
}
exports.verifyJwtToken = verifyJwtToken;
