import { MysqlCommentRepository} from "./mysqlCommentRepository";

import { CreateCommentUseCase } from "../application/createCommentUseCase";
import { CreateCommentController } from "./controller/createCommentController";

import { GetAllCommentsUseCase } from "../application/getAllCommetsUseCase";
import { GetAllCommnetsController } from "./controller/getAllCommnetsController";

import { GetPublicAllCommnetsUseCase } from "../application/getPublicAllCommentsUseCase";
import { GetPublicAllCommentsController } from "./controller/getPublicAllCommetsController";

import { UpdateCommnetUseCase } from "../application/updateCommnetUseCase";
import { UpdateCommnetController } from "./controller/updateCommentController";

import { DeleteCommentUseCase } from "../application/deleteCommnetUseCase";
import { DeleteCommentController } from "./controller/deleteCommnetsController";

import { MysqlUserRepository } from "../../user/infraestructure/mysqlUserRepository";
import { GetByIdUseCase } from "../../user/application/getByIdUseCase";

export const mysqlCommentRepository = new MysqlCommentRepository();
export const mysqlUserRepository = new MysqlUserRepository();

export const getByIdUseCase = new GetByIdUseCase(mysqlUserRepository);



export const createCommentUseCase = new CreateCommentUseCase(mysqlCommentRepository);
export const createCommentController = new CreateCommentController(createCommentUseCase,getByIdUseCase);

export const getAllCommentsUseCase = new GetAllCommentsUseCase (mysqlCommentRepository)
export const getAllCommnetsController = new GetAllCommnetsController(getAllCommentsUseCase);

export const getPublicAllCommnetsUseCase = new GetPublicAllCommnetsUseCase(mysqlCommentRepository)
export const getPublicAllCommentsController = new GetPublicAllCommentsController(getPublicAllCommnetsUseCase)

export const updateCommnetUseCase = new UpdateCommnetUseCase(mysqlCommentRepository);
export const updateCommnetController = new UpdateCommnetController(updateCommnetUseCase);

export const deleteCommentUseCase = new DeleteCommentUseCase(mysqlCommentRepository);
export const deleteCommentController = new DeleteCommentController(deleteCommentUseCase);
