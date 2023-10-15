import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validation/publicationValidation";


export class GetByUserPublicationUseCase{
    constructor( readonly publicRepository: PublicRepository){}

    async getByUserpublic(idUser: string):Promise<Public[] | null >{

        let post = new ValidatorId(idUser)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const getUser = await this.publicRepository.getByUserPublication(idUser);
            return getUser;
        } catch (error) {
            return null;
        }
    }

}