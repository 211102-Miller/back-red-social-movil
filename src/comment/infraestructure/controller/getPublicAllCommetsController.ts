import { Request,Response } from "express";
import { GetPublicAllCommnetsUseCase } from "../../application/getPublicAllCommentsUseCase";

export class GetPublicAllCommentsController{
    constructor(readonly getPublicAllCommnetsUseCase: GetPublicAllCommnetsUseCase){}

    async run(req:Request, res: Response){
        try {
            let {id_public} = req.params;

            const getAll = await this.getPublicAllCommnetsUseCase.run(id_public)
            if (getAll) {
                return res.status(200).json({
                  status: "success",
                  data: getAll,
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