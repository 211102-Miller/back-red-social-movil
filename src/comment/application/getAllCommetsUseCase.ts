import { Comment } from "../domain/comment";
import { CommentRespository } from "../domain/commetRepository";

export class GetAllCommentsUseCase{
    constructor( readonly commentRespository: CommentRespository){}


    async getAllComments():Promise<Comment[] | null>{
        try {
            const getAll = await this.commentRespository.getAllComments()
            return getAll;
        } catch (error) {
            return null;
        }
    }
}