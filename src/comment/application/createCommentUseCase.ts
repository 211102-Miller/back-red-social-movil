import { Comment } from "../domain/comment";
import { CommentRespository } from "../domain/commetRepository";
import { ValidationCreateCommnets } from "../domain/validation/validationCommnets";
import { validate } from "class-validator";
export class CreateCommentUseCase{
    constructor(readonly commentRespository: CommentRespository){}

    async run(uuid: string,id_user: string,id_public: string,text: string ):Promise<Comment | null>{
        
        let post = new ValidationCreateCommnets(uuid,id_user,id_public,text)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const create = await this.commentRespository.createComment(uuid,id_user, id_public, text);
            return create;
        } catch (error) {
            return null;
        }
    }
}