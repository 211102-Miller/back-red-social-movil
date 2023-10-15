import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";

export class UpdateDescriptionUseCase{
    constructor(readonly publicRepository: PublicRepository){}

    async updateDescription(uuid:string, description:string):Promise<Public| null >{
        try {
            const updateDescription = await this.publicRepository.updateDescription(uuid, description);
            return updateDescription;
        } catch (error) {
            return null;
        }
    }
}