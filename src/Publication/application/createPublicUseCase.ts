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
        type_file:string,
        userName:string,
        userNickName:string

    ): Promise<Public | null> {

        let post = new ValidationCreatePublic(uuid,idUser,description,url_file,type_file)
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
                type_file,
                userName,
                userNickName
            )
            return newPublic;
        } catch (error) {
            return null;
        }
    }
}