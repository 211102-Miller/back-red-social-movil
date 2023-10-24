import { Public } from "./public";

export interface PublicRepository{
    createPublicFile(
        uuid:string,
        idUser:string,
        description:string,
        url_file:string,
        type_file: string,
        userName:string,
        userNickName:string
    ):Promise<Public | null>;


    getAllPublications():Promise<Public[] | null>;

    getByPublication(uuid:string):Promise<Public | null>;

    getByUserPublication(idUser:string):Promise<Public[] | null>;

    updateDescription(
        uuid:string,
        description:string,
    ):Promise<Public|null>

    deletePublication(uuid:string):Promise<String | null>;




 
}