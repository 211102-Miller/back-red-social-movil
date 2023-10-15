import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";


export class GetByUserPublicationUseCase{
    constructor( readonly publicRepository: PublicRepository){}

    async getByUserpublic(idUser: string):Promise<Public[] | null >{
        try {
            const getUser = await this.publicRepository.getByUserPublication(idUser);
            return getUser;
        } catch (error) {
            return null;
        }
    }

}