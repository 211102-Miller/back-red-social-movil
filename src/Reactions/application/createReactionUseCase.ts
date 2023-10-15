import { Reaction } from "../Domain/reaction";
import { ReactionRepository } from "../Domain/reactionsRespository";
import { ValidationCreateReaction } from "../Domain/validation/validationReaction";
import { validate } from "class-validator";



export class CreateReactionUseCase{
    constructor(readonly reactionRepository: ReactionRepository){}

    async createReaction(uuid:string,id_user:string,id_public:string,reaction:string,type:string):Promise<Reaction | null>{

        let post = new ValidationCreateReaction(uuid,id_user,id_public,reaction,type)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const create = await this.reactionRepository.createReaction(uuid,id_user,id_public,reaction,type)
            return create;
        } catch (error) {
            return null;
        }
        
    }
}