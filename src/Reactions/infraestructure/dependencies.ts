import { MysqlReactionRepository } from "./mysqlReactionRepository";

import { CreateReactionUseCase } from "../application/createReactionUseCase";
import { CreateReactionController } from "./Controllers/createReactionController";

import { DeleteReactionUseCase } from "../application/deleteReactionUseCase";
import { DeleteReactionController } from "./Controllers/deleteReactionController";

import { GetAllReactionUseCase } from "../application/getAllReactionUseCase";
import { GetAllReactionControlller } from "./Controllers/getAllReactionController";

import { GetReactionCommentUseCase } from "../application/getReactionCommnetUseCase";
import { GetReactionCommentController } from "./Controllers/getReactionCommentController";

import { GetReactionPublicUseCase } from "../application/getReactionPublicUseCase";
import { GetReactionPublicController } from "./Controllers/getReactionPublicController";

export const mysqlReactionRepository = new MysqlReactionRepository();


export const createReactionUseCase = new CreateReactionUseCase(mysqlReactionRepository);
export const createReactionController = new CreateReactionController(createReactionUseCase);

export const deleteReactionUseCase = new DeleteReactionUseCase(mysqlReactionRepository);
export const deleteReactionController = new DeleteReactionController(deleteReactionUseCase);

export const getAllReactionUseCase = new GetAllReactionUseCase (mysqlReactionRepository);
export const getAllReactionControlller = new GetAllReactionControlller(getAllReactionUseCase);

export const getReactionCommentUseCase = new GetReactionCommentUseCase (mysqlReactionRepository)
export const getReactionCommentController = new GetReactionCommentController(getReactionCommentUseCase);

export const getReactionPublicUseCase = new GetReactionPublicUseCase (mysqlReactionRepository);
export const getReactionPublicController = new GetReactionPublicController(getReactionPublicUseCase);
