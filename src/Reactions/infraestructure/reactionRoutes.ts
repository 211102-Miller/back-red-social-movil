import express from 'express';
import { createReactionController,
    deleteReactionController,
    getAllReactionControlller,
    getReactionCommentController,
    getReactionPublicController,
    getReactionByPublicController
} from './dependencies';
import { validateToken } from '../../helpers/verifiqueToken';

export const reactionRoutes = express.Router();

// Middleware para verificar el token en las rutas siguientes
reactionRoutes.use(validateToken);


reactionRoutes.post("/create", createReactionController.create.bind(createReactionController))

reactionRoutes.delete("/delete/:uuid", deleteReactionController.deleteReaction.bind(deleteReactionController))

reactionRoutes.get("/all", getAllReactionControlller.run.bind(getAllReactionControlller))

reactionRoutes.get("/comment", getReactionCommentController.run.bind(getReactionCommentController))

reactionRoutes.get("/public", getReactionPublicController.run.bind(getReactionPublicController))

reactionRoutes.get("/public/:id_public", getReactionByPublicController.getPublic.bind(getReactionByPublicController))