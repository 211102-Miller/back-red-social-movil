import { Request, Response } from "express";
import { CreatePublicUseCase } from "../../application/createPublicUseCase";
import { v4 as uuid } from "uuid";
import uploadToFirebase from "../helpers/saveImg";
import { UploadedFile } from 'express-fileupload';

export class CreatePublicController {

    constructor(readonly createPublicUseCase: CreatePublicUseCase) { }

    async run(req: Request , res: Response) {
        try {
            let {
                idUser,
                description,
            } = req.body;
            // Asegúrate de que un archivo fue enviado
            if (!req.files || !req.files.url_file) {
                return res.status(400).send({
                    status: "error",
                    message: "No image file uploaded."
                });
            }   
            // Castear el archivo a UploadedFile (express-fileupload)
            const imgFile = req.files.url_file as UploadedFile;
            
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
            
            const miuuid: string = uuid();
            const url_file = await uploadToFirebase(imgFile, type_file);
            
            let newPublic = await this.createPublicUseCase.create(miuuid, idUser, description, url_file, type_file);
            
            if (newPublic) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        new_Public: newPublic
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while adding the publication."
                });
            }
            
        } catch (error) {
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
    }
}
