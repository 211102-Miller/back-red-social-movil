import { Reaction } from "../Domain/reaction";
import { ReactionRepository } from "../Domain/reactionsRespository";

export class GetReactionPublicUseCase{
    constructor(readonly reactionRepository: ReactionRepository){};

    async run(type:string): Promise<Reaction[]| null>{
        try {
            const getCommnet = await this.reactionRepository.getReactionPublic(type)
            return getCommnet;
        } catch (error) {
            return null;
        }
    }
}