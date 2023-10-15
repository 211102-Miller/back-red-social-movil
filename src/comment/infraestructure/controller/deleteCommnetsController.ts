import { Request,Response } from "express";
import { DeleteCommentUseCase } from "../../application/deleteCommnetUseCase";

export class DeleteCommentController{
    constructor(readonly deleteCommentUseCase: DeleteCommentUseCase){}


    async run(req: Request, res: Response){
        try {
            let {uuid} = req.params;

            const deletes = await this.deleteCommentUseCase.run(uuid);

            if (deletes) {
                return res.status(200).send({  // Cambiado el código de estado a 200 para OK
                    status: "success",
                    data: {
                        message: deletes
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
