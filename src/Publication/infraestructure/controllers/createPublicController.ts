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
            // Asegúrate de que un archivo fue envia    do
            if (!req.files || !req.files.url_file) {
                return res.status(400).send({
                    status: "error",
                    message: "No image file uploaded."
                });
            }   
            // Castear el archivo a UploadedFile (express-fileupload)
            const imgFile = req.files.url_file as UploadedFile;
            const miuuid: string = uuid();
            const reactions: number = 0;
            const url_file = await uploadToFirebase(imgFile)
            // Usa el archivo cargado de req.file para subirlo a Firebase

            let newPublic = await this.createPublicUseCase.create(miuuid, idUser, description,url_file,reactions);

            if (newPublic) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        new_Book: newPublic
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
                message: "An error occurred while adding the book."
            });
        }
    }
}
