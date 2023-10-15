import { Request,Response } from "express";
import { GetReactionCommentUseCase } from "../../application/getReactionCommnetUseCase";

export class GetReactionCommentController{

    constructor(readonly getReactionCommentUseCase: GetReactionCommentUseCase){}

    async run(req:Request, res:Response){
        try {
            let type = "Comment";

            const getComment = await this.getReactionCommentUseCase.run(type);
            if (getComment) {
                return res.status(200).json({
                  status: "success",
                  data: getComment,
                  message: "Publicaciones del usuario ",
                });
              } else {
                return res.status(404).json({
                  status: "error",
                  data: [],
                  message: "No se encontraron libros inactivos",
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