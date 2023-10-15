import express from 'express';
import { createCommentController,
    getAllCommnetsController,
    getPublicAllCommentsController,
    updateCommnetController,
    deleteCommentController
} from './dependencies';

export const commnetRoutes = express.Router();

commnetRoutes.post("/create", createCommentController.run.bind(createCommentController));

commnetRoutes.get("/all", getAllCommnetsController.run.bind(getAllCommnetsController));

commnetRoutes.get("/:id_public", getPublicAllCommentsController.run.bind(getPublicAllCommentsController));

commnetRoutes.put("/update", updateCommnetController.run.bind(updateCommnetController));

commnetRoutes.delete("/delete/:uuid", deleteCommentController.run.bind(deleteCommentController));