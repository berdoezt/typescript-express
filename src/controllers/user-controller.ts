import express from 'express';

import { UserService } from "../services/user-service";
import { CreateUserRequest, LoginUserRequest } from '../models/user-model';

export class UserController {
    private userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    register = async (req: express.Request, res: express.Response) => {
        try {
            const createUserRequest = req.body as CreateUserRequest
            const createUserReponse = await this.userService.register(createUserRequest)

            res.status(200).json({
                data: createUserReponse
            })
        } catch (e) {
            let errorMessage = "server error"

            if (e instanceof Error) {
                errorMessage = e.message
            }

            res.status(500).json({
                error: errorMessage
            })
        }
    }

    login = async (req: express.Request, res: express.Response) => {
        try {
            const loginUserRequest = req.body as LoginUserRequest
            const loginUserReponse = await this.userService.login(loginUserRequest)

            res.status(200).json({
                data: loginUserReponse
            })
        } catch (e) {
            let errorMessage = "server error"

            if (e instanceof Error) {
                errorMessage = e.message
            }

            res.status(500).json({
                error: errorMessage
            })
        }
    }
}