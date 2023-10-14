import { query } from "../../database/msql";
import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";


export class MysqlPublicRepository implements PublicRepository{

    async createPublic(uuid: string,idUser:string ,description: string, url_file: string,reactions:number): Promise<Public | null> {
        try {
            const sql = `
                INSERT INTO public (uuid, idUser, description, url_file,reactions)
                VALUES (?, ?, ?, ?, ?);
            `;
            const params = [uuid,idUser, description, url_file,reactions];
            const [result]: any = await query(sql, params);
        
            const newPublic: Public = new Public(uuid, idUser, description, url_file,reactions)
            return newPublic

        } catch (error) {
            console.error("Error adding book:", error);
            return null;
        }
    }
}