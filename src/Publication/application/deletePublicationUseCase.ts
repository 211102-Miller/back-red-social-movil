import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";


export class DetelePublicationUseCase{
    constructor(public publicRepository: PublicRepository){}


    async delete(uuid:string):Promise<String | null>{
        try {
            const deletePu = await this.publicRepository.deletePublication(uuid);
            return deletePu;
        } catch (error) {
            return null;
        }
    }
}