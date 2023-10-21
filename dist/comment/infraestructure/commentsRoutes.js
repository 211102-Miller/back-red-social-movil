"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commnetRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
const verifiqueToken_1 = require("../../helpers/verifiqueToken");
exports.commnetRoutes = express_1.default.Router();
exports.commnetRoutes.use(verifiqueToken_1.validateToken);
exports.commnetRoutes.post("/create", dependencies_1.createCommentController.run.bind(dependencies_1.createCommentController));
exports.commnetRoutes.get("/all", dependencies_1.getAllCommnetsController.run.bind(dependencies_1.getAllCommnetsController));
exports.commnetRoutes.get("/:id_public", dependencies_1.getPublicAllCommentsController.run.bind(dependencies_1.getPublicAllCommentsController));
exports.commnetRoutes.put("/update", dependencies_1.updateCommnetController.run.bind(dependencies_1.updateCommnetController));
exports.commnetRoutes.delete("/delete/:uuid", dependencies_1.deleteCommentController.run.bind(dependencies_1.deleteCommentController));
