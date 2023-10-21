import express from 'express';
import { createPublicController,
    geAllPublicationsController,
    getByPublicationController,
    getByUserPublicationController,
    updateDescriptionController,
    deletePublicationController
} from './dependencies';
import { validateToken } from '../../helpers/verifiqueToken';

export const publicRoutes = express.Router();

publicRoutes.use(validateToken);

publicRoutes.post("/create", createPublicController.run.bind(createPublicController))

publicRoutes.get("/all", geAllPublicationsController.getAllPublications.bind(geAllPublicationsController))

publicRoutes.get("/:uuid", getByPublicationController.getByPublic.bind(getByPublicationController))

publicRoutes.get("/user/:idUser", getByUserPublicationController.run.bind(getByUserPublicationController))

publicRoutes.put("/description", updateDescriptionController.updateDescription.bind(updateDescriptionController))

publicRoutes.delete("/delete/:uuid",deletePublicationController.deletePublication.bind(deletePublicationController))





