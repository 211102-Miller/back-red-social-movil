import { Request,Response } from "express";
import { UpdateDescriptionUseCase } from "../../application/updateDescrptionUseCase";


export class UpdateDescriptionController {
    constructor( readonly updateDescriptionUseCase: UpdateDescriptionUseCase){}

    async updateDescription(req:Request, res:Response){
        try {
            let {uuid,description} = req.body

            const updateDescription = await this.updateDescriptionUseCase.updateDescription(uuid, description);

            if (updateDescription) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: updateDescription
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Public not found"
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
    
