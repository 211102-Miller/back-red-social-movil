import { User } from "./user";

export interface UserRepository{
    createUser( //ya se valida class //listo
        uuid: string,
        name: string,
        last_name: string,
        phone_number: string,
        email: string,
        password: string,
        status: boolean
    ): Promise<User | null | string | Error> ;
}