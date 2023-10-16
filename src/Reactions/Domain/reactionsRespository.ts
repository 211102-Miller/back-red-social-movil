import { Reaction } from "./reaction";


export interface ReactionRepository{

    createReaction(
        uuid:string,
        id_user:string,
        id_public:string,
        reaction:string,
        type:string
    ):Promise<Reaction | null>
    
    deleteReaction(uuid:string):Promise<string | null>

    getAllReactions():Promise<Reaction[] | null>;

    getReactionCommnet(type:string):Promise<Reaction[] | null>;

    getReactionPublic(type:string):Promise<Reaction[] | null>;

    getReactionByPublic(id_public:string):Promise<Reaction[] | null>;
}