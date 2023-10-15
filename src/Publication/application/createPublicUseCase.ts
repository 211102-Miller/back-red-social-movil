import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";
import { ValidationCreatePublic } from "../domain/validation/publicationValidation";
import { validate } from "class-validator";


export class CreatePublicUseCase {
    constructor(readonly publicRepository: PublicRepository) { }

    async create(
        uuid: string,
        idUser: string,
        description: string,
        url_file: string,
        reactions:number

    ): Promise<Public | null> {

        let post = new ValidationCreatePublic(uuid,idUser,description,url_file,reactions)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const newPublic = await this.publicRepository.createPublicFile(
                uuid,
                idUser,
                description,
                url_file,
                reactions
            )
            return newPublic;
        } catch (error) {
            return null;
        }
    }
}