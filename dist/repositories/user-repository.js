"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor(db) {
        this.db = db;
    }
    create(userModel) {
        return new Promise((resolve, reject) => {
            const q = `INSERT INTO users(email, password, name) 
                    values('${userModel.email}', '${userModel.password}', '${userModel.name}')`;
            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.insertId);
            });
        });
    }
    getByEmail(email) {
        return new Promise((resolve, reject) => {
            const q = `SELECT * FROM users where email = '${email}'`;
            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (rows.length == 0) {
                    reject(new Error("data not found"));
                    return;
                }
                resolve({
                    id: rows[0].id,
                    email: rows[0].email,
                    password: rows[0].password,
                    name: rows[0].name
                });
            });
        });
    }
}
exports.UserRepository = UserRepository;
