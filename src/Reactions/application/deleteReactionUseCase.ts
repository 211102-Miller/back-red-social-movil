import { Reaction } from "../Domain/reaction";
import { ReactionRepository } from "../Domain/reactionsRespository";
import { validate } from "class-validator";
import { ValidatorId } from "../Domain/validation/validationReaction";



export class DeleteReactionUseCase{
    constructor( readonly reactionRepository: ReactionRepository){}

    async deleteReaction(uuid:string):Promise<string | null>{
        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const deletes = await this.reactionRepository.deleteReaction(uuid);
            return deletes;

        } catch (error) {
            return null
        }
    }
}