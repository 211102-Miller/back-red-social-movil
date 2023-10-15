import { Request,Response } from "express";
import { GetAllReactionUseCase } from "../../application/getAllReactionUseCase";

export class GetAllReactionControlller{

    constructor(readonly getAllReactionUseCase: GetAllReactionUseCase){}

    async run (req: Request, res: Response){
        try {
            const getAll = await this.getAllReactionUseCase.run();
            if(getAll){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        list: getAll
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "reactions not found"
                });
            }

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the books."
            });
        }
    }
}