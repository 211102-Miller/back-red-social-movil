import { MysqlUserRepository } from "./mysqlUserRepository";

import { CreateUserUseCase } from "../application/createUserUseCase";

import { CreateUserController } from "./controllers/createUserController";



export const mysqlUserRepository = new MysqlUserRepository();

export const createUserUseCase = new CreateUserUseCase(mysqlUserRepository)
export const createUserController = new CreateUserController(createUserUseCase)