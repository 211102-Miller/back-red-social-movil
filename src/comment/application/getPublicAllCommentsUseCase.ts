import { Comment } from "../domain/comment";
import { CommentRespository } from "../domain/commetRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validation/validationCommnets";


export class GetPublicAllCommnetsUseCase{
    constructor(readonly commentRespository:CommentRespository){}

    async run(id_public:string):Promise<Comment[] | null>{
        
        let post = new ValidatorId(id_public)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const get = await this.commentRespository.getpublicAllComments(id_public);
            return get;
        } catch (error) {
            return null;
        }
    }
}