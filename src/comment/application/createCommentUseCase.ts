import { Comment } from "../domain/comment";
import { CommentRespository } from "../domain/commetRepository";

export class CreateCommentUseCase{
    constructor(readonly commentRespository: CommentRespository){}

    async run(uuid: string,id_user: string,id_public: string,text: string ):Promise<Comment | null>{
        try {
            const create = await this.commentRespository.createComment(uuid,id_user, id_public, text);
            return create;
        } catch (error) {
            return null;
        }
    }
}