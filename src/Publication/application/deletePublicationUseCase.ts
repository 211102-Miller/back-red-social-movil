import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validation/publicationValidation";


export class DetelePublicationUseCase{
    constructor(public publicRepository: PublicRepository){}


    async delete(uuid:string):Promise<String | null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const deletePu = await this.publicRepository.deletePublication(uuid);
            return deletePu;
        } catch (error) {
            return null;
        }
    }
}