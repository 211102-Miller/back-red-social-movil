import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { query } from "../../database/msql";
import { isEmailRegistered } from "./validation/usermsql";


export class MysqlUserRepository implements UserRepository{

    async createUser(uuid: string, name: string, last_name: string, phone_number: string, email: string, password: string, status: boolean): Promise<string | User | Error | null> {
        try {
            
            await isEmailRegistered(email)
           
            let sql = "INSERT INTO users(uuid, name, last_name, phone_number , email, password,status) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid, name, last_name, phone_number, email, password, status];
            const [result]: any = await query(sql, params);
            return new User(uuid, name, last_name, phone_number, email, password, status);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }

}