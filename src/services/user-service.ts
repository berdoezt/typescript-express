import bcrypt from 'bcrypt';
import { CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse } from "../models/user-model";
import { UserRepository } from "../repositories/user-repository";
import { generateJwtToken } from '../utils/util';

export class UserService {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async register(createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {
        const hashedPassword = await bcrypt.hash(createUserRequest.password, 10)
        const createdUserId = await this.userRepository.create({
            id: 0,
            email: createUserRequest.email,
            password: hashedPassword,
            name: createUserRequest.name
        })

        return {
            id: createdUserId
        }
    }

    async login(loginUserRequest: LoginUserRequest): Promise<LoginUserResponse> {
        const user = await this.userRepository.getByEmail(loginUserRequest.email)
        const isPasswordMatched = await bcrypt.compare(loginUserRequest.password, user.password)

        if (!isPasswordMatched) {
            throw new Error("invalid password")
        }

        const jwtToken = await generateJwtToken(user.id)
        
        return {
            token: jwtToken
        }
    }
}