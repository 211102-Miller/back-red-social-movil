import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";

export class CreatePublicUseCase {
    constructor(readonly publicRepository: PublicRepository) { }

    async create(
        uuid: string,
        idUser: string,
        description: string,
        url_file: string,
        reactions:number

    ): Promise<Public | null> {

        try {
            const newPublic = await this.publicRepository.createPublic(
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