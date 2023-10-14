import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { validate } from "class-validator";
import { ValidatorupdatePassword } from "../domain/validation/user";


export class  UpdatePasswordUseCase{
    constructor(readonly userRepository:UserRepository){}

    async updatePassword(uuid:string,password:string):Promise<User |null>{

        let post = new ValidatorupdatePassword(uuid, password)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const update = await this.userRepository.updatePassword(uuid,password);
            return update;
        } catch (error) {
            return null;
        }
    }
}