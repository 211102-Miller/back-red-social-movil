import { Comment } from "../domain/comment";
import { CommentRespository } from "../domain/commetRepository";
import { validate } from "class-validator";
import { ValidatorUpdateComment } from "../domain/validation/validationCommnets";

export class UpdateCommnetUseCase{
    constructor( readonly commetRepository: CommentRespository){}

    async run(uuid:string,text:string):Promise<Comment | null>{

        let post = new ValidatorUpdateComment(uuid,text);
        const validation = await validate(post)
        console.log(validation.length)
        
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const update = await this.commetRepository.UpdateComment(uuid,text);
            return update;
        } catch (error) {
            return null;
        }
    }
}