"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentController = void 0;
const uuid_1 = require("uuid");
class CreateCommentController {
    constructor(createCommentUseCase, getByIdUseCase) {
        this.createCommentUseCase = createCommentUseCase;
        this.getByIdUseCase = getByIdUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id_user, id_public, text } = req.body;
                const miuuid = (0, uuid_1.v4)();
                const getUserInfo = yield this.getByIdUseCase.getId(id_user);
                if (getUserInfo) {
                    const create = yield this.createCommentUseCase.run(miuuid, id_user, id_public, text, getUserInfo === null || getUserInfo === void 0 ? void 0 : getUserInfo.name, getUserInfo === null || getUserInfo === void 0 ? void 0 : getUserInfo.nick_name);
                    return res.status(201).send({
                        status: "success",
                        data: {
                            new_Book: create
                        }
                    });
                }
                else {
                    return res.status(500).send({
                        status: "error",
                        message: "An error occurred while adding the publication."
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message.startsWith('[')) {
                        return res.status(400).send({
                            status: "error",
                            message: "Validation failed",
                            errors: JSON.parse(error.message)
                        });
                    }
                }
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while adding the book."
                });
            }
        });
    }
}
exports.CreateCommentController = CreateCommentController;
