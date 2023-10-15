import { Comment } from "../domain/comment";
import { CommentRespository } from "../domain/commetRepository";

export class DeleteCommentUseCase{
    constructor(readonly commentRespository: CommentRespository){}

    async run(uuid:string):Promise<Comment |string| null>{
        try {
            const deletes = await this.commentRespository.deleteCommnet(uuid);
            return deletes;
        } catch (error) {
            return null;
        }
    }
}