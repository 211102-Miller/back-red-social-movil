import { Request,Response } from "express";
import { GetReactionByPublicUseCase } from "../../application/getReactionByPublicUseCase";


export class GetReactionByPublicController{
    constructor(readonly getReactionByPublicUseCase:GetReactionByPublicUseCase){}

    async getPublic(req:Request, res:Response){
        try {
            let{id_public}= req.params;

            const getPuglic = await this.getReactionByPublicUseCase.run(id_public)
            if (getPuglic) {
                return res.status(200).json({
                  status: "success",
                  data: getPuglic,
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
            
        }
    }
}