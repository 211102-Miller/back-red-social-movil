import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";


export class GetAllPublicationsUseCase{
    constructor(readonly publicRepository: PublicRepository){}

    async getPublications():Promise<Public[] | null>{
        try {
            const getAll = await this.publicRepository.getAllPublications()
            return getAll;
            
        } catch (error) {
            return null;
        }
    }
}