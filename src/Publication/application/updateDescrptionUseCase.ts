import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";
import { validate } from "class-validator";
import { ValidatorUpdateDescription } from "../domain/validation/publicationValidation";

export class UpdateDescriptionUseCase{
    constructor(readonly publicRepository: PublicRepository){}

    async updateDescription(uuid:string, description:string):Promise<Public| null >{
        let post = new ValidatorUpdateDescription(uuid,description);
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const updateDescription = await this.publicRepository.updateDescription(uuid, description);
            return updateDescription;
        } catch (error) {
            return null;
        }
    }
}