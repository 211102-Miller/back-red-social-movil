import { Request,Response } from "express";
import { DeleteReactionUseCase } from "../../application/deleteReactionUseCase";

export class DeleteReactionController{
    constructor(readonly deleteReactionUseCase: DeleteReactionUseCase){}

    async deleteReaction(req: Request, res: Response){
        try {
            let {uuid} = req.params;

            const deleReaction = await this.deleteReactionUseCase.deleteReaction(uuid);
            if (deleReaction) {
                return res.status(200).send({
                    status: "Usuario eliminado",
                    data: {
                        new_Book: deleReaction
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