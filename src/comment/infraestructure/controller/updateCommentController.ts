import { Request,Response} from "express";
import { UpdateCommnetUseCase } from "../../application/updateCommnetUseCase";


export class UpdateCommnetController{
    constructor(readonly updateCommnetUseCase: UpdateCommnetUseCase){}

    async run(req: Request, res: Response){
        try {
            let {uuid,text} = req.body;

            const update = await this.updateCommnetUseCase.run(uuid,text);
            if (update) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: update
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Public not found"
                });
            }

        }catch (error) {
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