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
    constructor(createPublicUseCase) {
        this.createPublicUseCase = createPublicUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { idUser, description, } = req.body;
                // Asegúrate de que un archivo fue enviado
                if (!req.files || !req.files.url_file) {
                    return res.status(400).send({
                        status: "error",
                        message: "No image file uploaded."
                    });
                }
                // Castear el archivo a UploadedFile (express-fileupload)
                const imgFile = req.files.url_file;
                // Genera un nombre único para el archivo basado en la fecha y el nombre original
                const uniqueName = `${Date.now()}-${imgFile.name}`;
                // Obtiene la extensión del archivo desde su nombre
                const fileExtension = imgFile.name.split('.').pop();
                // Determina el tipo de archivo basado en la extensión
                let type_file = '';
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
                        // Agrega más extensiones y tipos de archivo según tus necesidades
                    }
                }
                const miuuid = (0, uuid_1.v4)();
                const url_file = yield (0, saveImg_1.default)(imgFile, type_file);
                let newPublic = yield this.createPublicUseCase.create(miuuid, idUser, description, url_file, type_file);
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
