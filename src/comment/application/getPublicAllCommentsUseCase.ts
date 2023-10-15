import { Comment } from "../domain/comment";
import { CommentRespository } from "../domain/commetRepository";


export class GetPublicAllCommnetsUseCase{
    constructor(readonly commentRespository:CommentRespository){}

    async run(id_public:string):Promise<Comment[] | null>{
        try {
            const get = await this.commentRespository.getpublicAllComments(id_public);
            return get;
        } catch (error) {
            return null;
        }
    }
}