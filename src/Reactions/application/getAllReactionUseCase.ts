import { Reaction } from "../Domain/reaction";
import { ReactionRepository } from "../Domain/reactionsRespository";


export class GetAllReactionUseCase{
    constructor(readonly reactionRepository: ReactionRepository){}

    async run():Promise<Reaction[] |null>{
        try {
            const getAll = await this.reactionRepository.getAllReactions();
            return getAll;
        } catch (error) {
            return null;
        }
    }
}