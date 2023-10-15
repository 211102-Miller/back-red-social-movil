import { Comment } from "../domain/comment";
import { CommentRespository } from "../domain/commetRepository";

export class UpdateCommnetUseCase{
    constructor( readonly commetRepository: CommentRespository){}

    async run(uuid:string,text:string):Promise<Comment | null>{
        try {
            const update = await this.commetRepository.UpdateComment(uuid,text);
            return update;
        } catch (error) {
            return null;
        }
    }
}