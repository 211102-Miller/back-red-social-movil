"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
const verifiqueToken_1 = require("../../helpers/verifiqueToken");
exports.publicRoutes = express_1.default.Router();
exports.publicRoutes.use(verifiqueToken_1.validateToken);
exports.publicRoutes.post("/create", dependencies_1.createPublicController.run.bind(dependencies_1.createPublicController));
exports.publicRoutes.get("/all", dependencies_1.geAllPublicationsController.getAllPublications.bind(dependencies_1.geAllPublicationsController));
exports.publicRoutes.get("/:uuid", dependencies_1.getByPublicationController.getByPublic.bind(dependencies_1.getByPublicationController));
exports.publicRoutes.get("/user/:idUser", dependencies_1.getByUserPublicationController.run.bind(dependencies_1.getByUserPublicationController));
exports.publicRoutes.put("/description", dependencies_1.updateDescriptionController.updateDescription.bind(dependencies_1.updateDescriptionController));
exports.publicRoutes.delete("/delete/:uuid", dependencies_1.deletePublicationController.deletePublication.bind(dependencies_1.deletePublicationController));
