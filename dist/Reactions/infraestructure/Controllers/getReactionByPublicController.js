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
exports.GetReactionByPublicController = void 0;
class GetReactionByPublicController {
    constructor(getReactionByPublicUseCase) {
        this.getReactionByPublicUseCase = getReactionByPublicUseCase;
    }
    getPublic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id_public } = req.params;
                const getPuglic = yield this.getReactionByPublicUseCase.run(id_public);
                if (getPuglic) {
                    return res.status(200).json({
                        status: "success",
                        data: getPuglic,
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
            }
        });
    }
}
exports.GetReactionByPublicController = GetReactionByPublicController;
