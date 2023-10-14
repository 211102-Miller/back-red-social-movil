import { MysqlPublicRepository } from "./mysqlPublicRepository";

import { CreatePublicUseCase } from "../application/createPublicUseCase";
import { CreatePublicController } from "./controllers/createPublicController";


export const mysqlPublicRepository = new MysqlPublicRepository();

export const createPublicUseCase = new CreatePublicUseCase(mysqlPublicRepository);
export const createPublicController = new CreatePublicController(createPublicUseCase);