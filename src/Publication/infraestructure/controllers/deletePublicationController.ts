import { Request,Response } from "express";
import {DetelePublicationUseCase} from "../../application/deletePublicationUseCase"

export class DeletePublicationController{
    constructor(readonly deletePublicationUseCase:DetelePublicationUseCase){}


    async deletePublication(req:Request, res:Response){
        try {
            let {uuid} = req.params;

            const deletea = await this.deletePublicationUseCase.delete(uuid)
            if (deletea) {
                return res.status(200).send({  // Cambiado el código de estado a 200 para OK
                    status: "success",
                    data: {
                        message: deletea
                    }
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "public not found."
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
                message: "An error occurred while fetching the book."
            });
        }
    }
}