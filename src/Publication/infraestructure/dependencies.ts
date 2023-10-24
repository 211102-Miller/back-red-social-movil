import { MysqlPublicRepository } from "./mysqlPublicRepository";

import { CreatePublicUseCase } from "../application/createPublicUseCase";
import { CreatePublicController } from "./controllers/createPublicController";

import { GetAllPublicationsUseCase}  from "../application/getAllPublicationsUseCase";
import { GetAllPublicationsController } from "./controllers/getAllPublicationsController";

import { GetByPublicationUseCase } from "../application/getByPublicationUseCase";
import { GetByPublicationController } from "./controllers/getByPublicationController";

import { GetByUserPublicationUseCase } from "../application/getByUserPublicationUseCase";
import { GetByUserPublicationController } from "./controllers/getByUserPublicationController";

import { UpdateDescriptionUseCase } from "../application/updateDescrptionUseCase";
import { UpdateDescriptionController } from "./controllers/updateDescriptionController";

import {DetelePublicationUseCase} from "../application/deletePublicationUseCase";
import { DeletePublicationController } from "./controllers/deletePublicationController";


import { GetByIdUseCase } from "../../user/application/getByIdUseCase";
import { MysqlUserRepository } from "../../user/infraestructure/mysqlUserRepository";



export const mysqlPublicRepository = new MysqlPublicRepository();
export const mysqlUserRepository = new MysqlUserRepository();

export const getByIdUseCase= new GetByIdUseCase(mysqlUserRepository);

export const createPublicUseCase = new CreatePublicUseCase(mysqlPublicRepository);
export const createPublicController = new CreatePublicController(createPublicUseCase,getByIdUseCase);

export const getAllPublicationsUseCase = new GetAllPublicationsUseCase(mysqlPublicRepository);
export const geAllPublicationsController = new GetAllPublicationsController(getAllPublicationsUseCase);

export const getByPublicationUseCase = new GetByPublicationUseCase(mysqlPublicRepository);
export const getByPublicationController = new GetByPublicationController(getByPublicationUseCase);

export const getByUserPublicationUseCase = new GetByUserPublicationUseCase(mysqlPublicRepository);
export const getByUserPublicationController = new GetByUserPublicationController(getByUserPublicationUseCase);

export const updateDescriptionUseCase = new UpdateDescriptionUseCase(mysqlPublicRepository)
export const updateDescriptionController = new UpdateDescriptionController(updateDescriptionUseCase);

export const detelePublicationUseCase = new DetelePublicationUseCase(mysqlPublicRepository)
export const deletePublicationController = new DeletePublicationController(detelePublicationUseCase);