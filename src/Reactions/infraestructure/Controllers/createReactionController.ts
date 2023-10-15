import { Request, Response } from "express";
import { CreateReactionUseCase } from "../../application/createReactionUseCase";
import { v4 as uuid } from "uuid";

export class CreateReactionController{
    constructor(readonly createReactionUseCase:CreateReactionUseCase){}

    async create(req: Request, res: Response){

        try {
            let {id_user, id_public,reaction,type} = req.body
            const miuuid: string = uuid();


            const create =await this.createReactionUseCase.createReaction(miuuid, id_user, id_public, reaction, type)
            
            if (create) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        new_Book: create
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