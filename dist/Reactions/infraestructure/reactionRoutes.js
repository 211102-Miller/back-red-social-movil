"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
const verifiqueToken_1 = require("../../helpers/verifiqueToken");
exports.reactionRoutes = express_1.default.Router();
// Middleware para verificar el token en las rutas siguientes
exports.reactionRoutes.use(verifiqueToken_1.validateToken);
exports.reactionRoutes.post("/create", dependencies_1.createReactionController.create.bind(dependencies_1.createReactionController));
exports.reactionRoutes.delete("/delete/:uuid", dependencies_1.deleteReactionController.deleteReaction.bind(dependencies_1.deleteReactionController));
exports.reactionRoutes.get("/all", dependencies_1.getAllReactionControlller.run.bind(dependencies_1.getAllReactionControlller));
exports.reactionRoutes.get("/comment", dependencies_1.getReactionCommentController.run.bind(dependencies_1.getReactionCommentController));
exports.reactionRoutes.get("/public", dependencies_1.getReactionPublicController.run.bind(dependencies_1.getReactionPublicController));
exports.reactionRoutes.get("/public/:id_public", dependencies_1.getReactionByPublicController.getPublic.bind(dependencies_1.getReactionByPublicController));
