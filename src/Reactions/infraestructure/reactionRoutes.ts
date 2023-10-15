import express from 'express';
import { createReactionController,
    deleteReactionController,
    getAllReactionControlller,
    getReactionCommentController,
    getReactionPublicController
} from './dependencies';

export const reactionRoutes = express.Router();


reactionRoutes.post("/create", createReactionController.create.bind(createReactionController))

reactionRoutes.delete("/delete/:uuid", deleteReactionController.deleteReaction.bind(deleteReactionController))

reactionRoutes.get("/all", getAllReactionControlller.run.bind(getAllReactionControlller))

reactionRoutes.get("/comment", getReactionCommentController.run.bind(getReactionCommentController))

reactionRoutes.get("/public", getReactionPublicController.run.bind(getReactionPublicController))