import { Reaction } from "../Domain/reaction";
import { ReactionRepository } from "../Domain/reactionsRespository";


export class DeleteReactionUseCase{
    constructor( readonly reactionRepository: ReactionRepository){}

    async deleteReaction(uuid:string):Promise<string | null>{
        try {
            const deletes = await this.reactionRepository.deleteReaction(uuid);
            return deletes;

        } catch (error) {
            return null
        }
    }
}