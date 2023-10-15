import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validation/publicationValidation";
export class GetByPublicationUseCase{
    constructor( readonly publicRepository: PublicRepository){}


    async getPublic(uuid:string):Promise<Public | null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }


        try {
            const get = await this.publicRepository.getByPublication(uuid);
            return get;
        } catch (error) {
            return null;
        }
    }
}