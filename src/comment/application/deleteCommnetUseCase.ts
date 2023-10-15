import { Comment } from "../domain/comment";
import { CommentRespository } from "../domain/commetRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validation/validationCommnets";

export class DeleteCommentUseCase{
    constructor(readonly commentRespository: CommentRespository){}

    async run(uuid:string):Promise<Comment |string| null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const deletes = await this.commentRespository.deleteCommnet(uuid);
            return deletes;
        } catch (error) {
            return null;
        }
    }
}