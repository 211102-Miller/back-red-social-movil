import { Reaction } from "../Domain/reaction";
import { ReactionRepository } from "../Domain/reactionsRespository";


export class GetReactionByPublicUseCase{
    constructor(readonly reactionRepository: ReactionRepository){}

    async run(id_public: string):Promise<Reaction[]| null>{
        try {
            const getPublic = await this.reactionRepository.getReactionByPublic(id_public);
            return getPublic;
        } catch (error) {
            return null;
        }
    }
}