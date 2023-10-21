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
exports.CreateReactionUseCase = void 0;
const validationReaction_1 = require("../Domain/validation/validationReaction");
const class_validator_1 = require("class-validator");
class CreateReactionUseCase {
    constructor(reactionRepository) {
        this.reactionRepository = reactionRepository;
    }
    createReaction(uuid, id_user, id_public, reaction, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = new validationReaction_1.ValidationCreateReaction(uuid, id_user, id_public, reaction, type);
            const validation = yield (0, class_validator_1.validate)(post);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const create = yield this.reactionRepository.createReaction(uuid, id_user, id_public, reaction, type);
                return create;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreateReactionUseCase = CreateReactionUseCase;
