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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePublicController = void 0;
const uuid_1 = require("uuid");
const saveImg_1 = __importDefault(require("../helpers/saveImg"));
class CreatePublicController {
    constructor(createPublicUseCase, getByIdUseCase) {
        this.createPublicUseCase = createPublicUseCase;
        this.getByIdUseCase = getByIdUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { idUser, description } = req.body;
                if (!idUser || !description) {
                    return res.status(400).send({
                        status: "error",
                        message: "Missing required fields (idUser or description)."
                    });
                }
                // Castear el archivo a UploadedFile (express-fileupload)
                const imgFile = req.files ? req.files.url_file : null;
                let url_file = null;
                let type_file = null;
                if (imgFile) {
                    // Genera un nombre único para el archivo basado en la fecha y el nombre original
                    const uniqueName = `${Date.now()}-${imgFile.name}`;
                    // Obtiene la extensión del archivo desde su nombre
                    const fileExtension = imgFile.name.split('.').pop();
                    if (fileExtension) {
                        switch (fileExtension.toLowerCase()) {
                            case 'png':
                                type_file = 'image/png';
                                break;
                            case 'jpg':
                            case 'jpeg':
                                type_file = 'image/jpeg';
                                break;
                            case 'mp4':
                                type_file = 'video/mp4';
                                break;
                            case 'gif':
                                type_file = 'image/gif';
                                break;
                            case 'mp3':
                                type_file = 'audio/mpeg';
                                break;
                            case 'wav':
                                type_file = 'audio/wav';
                                break;
                            case 'avi':
                                type_file = 'video/x-msvideo';
                                break;
                            case 'mov':
                                type_file = 'video/quicktime';
                                break;
                            case 'oog':
                                type_file = 'audio/ogg'; // Agrega esta línea para archivos "oog"
                                break;
                            case 'aac':
                                type_file = 'audio/aac'; // Agrega el tipo de archivo AAC
                                break;
                            case '""':
                                type_file = 'audio/aac'; // Agrega el tipo de archivo AAC
                                break;
                        }
                    }
                    if (type_file) {
                        url_file = yield (0, saveImg_1.default)(imgFile, type_file);
                    }
                }
                const miuuid = (0, uuid_1.v4)();
                // Obtén información del usuario utilizando GetByIdUseCase
                const getUserInfo = yield this.getByIdUseCase.getId(idUser);
                if (getUserInfo) {
                    // Llama a createPublicFile con información del usuario
                    let newPublic = yield this.createPublicUseCase.create(miuuid, idUser, description, url_file || "", type_file || "text/plain", getUserInfo.name, // Nombre del usuario
                    getUserInfo.nick_name // Nickname del usuario
                    );
                    if (newPublic) {
                        return res.status(201).send({
                            status: "success",
                            data: {
                                new_Public: newPublic
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
                else {
                    return res.status(404).send({
                        status: "error",
                        message: "User not found."
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
                    message: "An error occurred while adding the publication."
                });
            }
        });
    }
}
exports.CreatePublicController = CreatePublicController;
