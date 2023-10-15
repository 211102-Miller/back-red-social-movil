import { Comment } from "./comment";

export interface CommentRespository{
    
    createComment(
        uuid:string,
        id_user:string,
        id_public:string,
        text:string,
    ):Promise<Comment | null>;

    getAllComments():Promise<Comment[] | null>;

    getpublicAllComments(id_public:string):Promise<Comment[] | null>;

    UpdateComment(uuid:string, text:string):Promise<Comment |null>

    deleteCommnet(uuid:string):Promise<Comment | string | null>
}