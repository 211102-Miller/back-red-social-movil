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
exports.GetReactionPublicController = void 0;
class GetReactionPublicController {
    constructor(getReactionPublicUseCase) {
        this.getReactionPublicUseCase = getReactionPublicUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let type = "Publication";
                const getComment = yield this.getReactionPublicUseCase.run(type);
                if (getComment) {
                    return res.status(200).json({
                        status: "success",
                        data: getComment,
                        message: "Publicaciones del usuario ",
                    });
                }
                else {
                    return res.status(404).json({
                        status: "error",
                        data: [],
                        message: "No se encontraron libros inactivos",
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
exports.GetReactionPublicController = GetReactionPublicController;
