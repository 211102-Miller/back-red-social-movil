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
exports.CreatePublicUseCase = void 0;
const publicationValidation_1 = require("../domain/validation/publicationValidation");
const class_validator_1 = require("class-validator");
class CreatePublicUseCase {
    constructor(publicRepository) {
        this.publicRepository = publicRepository;
    }
    create(uuid, idUser, description, url_file, type_file) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = new publicationValidation_1.ValidationCreatePublic(uuid, idUser, description, url_file, type_file);
            const validation = yield (0, class_validator_1.validate)(post);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const newPublic = yield this.publicRepository.createPublicFile(uuid, idUser, description, url_file, type_file);
                return newPublic;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreatePublicUseCase = CreatePublicUseCase;
