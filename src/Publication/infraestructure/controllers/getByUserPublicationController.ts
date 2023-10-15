import { Request,Response } from "express";
import { GetByUserPublicationUseCase } from "../../application/getByUserPublicationUseCase";

export class GetByUserPublicationController{
    constructor(readonly getByUserPublicationUseCase :GetByUserPublicationUseCase){}


    async run(req:Request, res:Response){
        try {
            let { idUser } = req.params;

            const getUserPublic = await this.getByUserPublicationUseCase.getByUserpublic(idUser);

            if (getUserPublic) {
                return res.status(200).json({
                  status: "success",
                  data: getUserPublic,
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