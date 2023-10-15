import { Reaction } from "../Domain/reaction";
import { ReactionRepository } from "../Domain/reactionsRespository";


export class CreateReactionUseCase{
    constructor(readonly reactionRepository: ReactionRepository){}

    async createReaction(uuid:string,id_user:string,id_public:string,reaction:string,type:string):Promise<Reaction | null>{

        try {
            const create = await this.reactionRepository.createReaction(uuid,id_user,id_public,reaction,type)
            return create;
        } catch (error) {
            return null;
        }
        
    }
}