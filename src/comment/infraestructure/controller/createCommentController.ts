import { Request,Response  } from "express";
import { CreateCommentUseCase } from "../../application/createCommentUseCase";
import { GetByIdUseCase } from "../../../user/application/getByIdUseCase";
import { v4 as uuid } from "uuid";


export class CreateCommentController{
    constructor(readonly createCommentUseCase:CreateCommentUseCase,
                readonly getByIdUseCase:GetByIdUseCase ){}

    async run(req: Request,res: Response){
        try {
            let{id_user,id_public,text} = req.body
            const miuuid: string = uuid();

            const getUserInfo = await this.getByIdUseCase.getId(id_user as string);



            

            if (getUserInfo) {
                
                const create = await this.createCommentUseCase.run(miuuid,id_user,id_public,text,getUserInfo?.name,getUserInfo?.nick_name);
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