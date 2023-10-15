import { Request,Response  } from "express";
import { CreateCommentUseCase } from "../../application/createCommentUseCase";
import { v4 as uuid } from "uuid";


export class CreateCommentController{
    constructor(readonly createCommentUseCase:CreateCommentUseCase){}

    async run(req: Request,res: Response){
        try {
            let{id_user,id_public,text} = req.body
            const miuuid: string = uuid();

            const create = await this.createCommentUseCase.run(miuuid,id_user,id_public,text);

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