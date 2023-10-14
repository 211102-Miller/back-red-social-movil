import { Public } from "./public";

export interface PublicRepository{
    createPublic(
        uuid:string,
        idUser:string,
        description:string,
        url_file:string,
        reactions: number,
        
    ):Promise<Public | null>;
}