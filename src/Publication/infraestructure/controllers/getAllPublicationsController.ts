import { Request,Response } from "express";
import { GetAllPublicationsUseCase } from "../../application/getAllPublicationsUseCase";


export class GetAllPublicationsController{
    constructor(readonly getAllPublicationsUseCase: GetAllPublicationsUseCase){}


    async getAllPublications(req:Request, res:Response){
        try {
            let getAll = await this.getAllPublicationsUseCase.getPublications()

            if(getAll){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        list: getAll
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "Publics not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the books."
            });
        }
    }
}