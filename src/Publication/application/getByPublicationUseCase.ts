import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";

export class GetByPublicationUseCase{
    constructor( readonly publicRepository: PublicRepository){}


    async getPublic(uuid:string):Promise<Public | null>{
        try {
            const get = await this.publicRepository.getByPublication(uuid);
            return get;
        } catch (error) {
            return null;
        }
    }
}