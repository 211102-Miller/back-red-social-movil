import { query } from "../../database/msql";
import { Public } from "../domain/public";
import { PublicRepository } from "../domain/publicRepository";


export class MysqlPublicRepository implements PublicRepository{

    async createPublicFile(uuid: string, idUser: string, description: string, url_file: string, type_file: string, userName: string, userNickName: string): Promise<Public | null> {
        try {
            // Primero, verifica si el usuario con el UUID existe en la base de datos
            const userCheckSql = `
                SELECT name, nick_name FROM users WHERE uuid = ?;
            `;
            const userCheckParams = [idUser];

            const [userResult]: any = await query(userCheckSql, userCheckParams);

            if (userResult.length === 0) {
                // El usuario con el UUID proporcionado no existe en la base de datos
                return null;
            }

            // El usuario existe, ahora puedes insertar el nuevo registro en la tabla "public"
            const sql = `
                INSERT INTO public (uuid, idUser, description, url_file, type_file, userName, userNickName)
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
            const params = [uuid, idUser, description, url_file, type_file, userName, userNickName];
            const [result]: any = await query(sql, params);

            const newPublic: Public = new Public(uuid, idUser, description, url_file, type_file, userName, userNickName);

            return newPublic;
        } catch (error) {
            console.error("Error adding content:", error);
            return null;
        }
    }
    async getAllPublications(): Promise<Public[] | null> {
        try {
            const sql = "SELECT * FROM public"; // Asumiendo que tu tabla se llama 'books'
            const [rows]: any = await query(sql);

            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const books: Public[] = rows.map(row => {
                return new Public(
                    row.uuid,
                    row.idUser,
                    row.description,
                    row.url_file,
                    row.type_file,
                    row.userName,
                    row.userNickName,
                );
            });

            return books;

        } catch (error) {
            console.error("Error fetching books:", error);
            return null;
        }
    }
    async getByPublication(uuid: string): Promise<Public | null> {
        try {
            const sql = "SELECT * FROM public WHERE uuid = ?";
            const [rows]: any = await query(sql, [uuid]);

            // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const row = rows[0]; // Como estamos buscando por ID, sólo debe haber una coincidencia

            const publics = new Public(
                row.uuid,
                row.idUser,
                row.description,
                row.url_file,
                row.type_file,
                row.userName,
                row.userNickName,
            );

            return publics;

        } catch (error) {
            console.error('Error al obtener el libro:', error);
            return null;
        }
    }
    async getByUserPublication(idUser: string): Promise<Public[] | null> {
        try {
            const sql = "SELECT * FROM public WHERE idUser = ?";
            const params: any[] = [idUser]; // Pasa idUser como argumento, no status
    
            const [result]: any = await query(sql, params);
    
            if (result && result.length > 0) {
                // Mapea los resultados en objetos Public
                const publicsUser = result.map((publicData: any) => new Public(
                    publicData.uuid,
                    publicData.idUser,
                    publicData.description,
                    publicData.url_file,
                    publicData.type_file,
                    publicData.userName,
                    publicData.userNickName,
                ));
    
                return publicsUser;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error al obtener la lista de publicaciones del usuario:", error);
            return null;
        }
    }
    async updateDescription(uuid: string, description: string): Promise<Public | null> {
        try {
            const sql = 'UPDATE public SET description = ? WHERE uuid = ?';
            const result: any = await query(sql, [description, uuid]);
    
            // Verificar si se actualizó alguna fila
            if (!result || result.affectedRows === 0) return null;
    
            // Obtener el usuario actualizado
            const [updatedRows]: any = await query('SELECT * FROM public WHERE uuid = ?', [uuid]);
            if (updatedRows.length === 0) return null;
    
            const updatedDescription = new Public(
                updatedRows[0].uuid,
                updatedRows[0].idUserName,
                updatedRows[0].description,
                updatedRows[0].url_file,
                updatedRows[0].type_file,
                updatedRows[0].userName,
                updatedRows[0].userNickName,
            );
    
            return updatedDescription;
        } catch (error) {
            console.error('Error updating description:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }
    
    async deletePublication(uuid: string): Promise<String | null> {
        try {
            // Primero, verifiquemos si el libro con el uuid proporcionado existe
            const checkSql = "SELECT * FROM public WHERE uuid = ?";
            const [existingPublic]: any = await query(checkSql, [uuid]);

            // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
            if (!Array.isArray(existingPublic) || existingPublic.length === 0) {
                return null;
            }

            // Si el libro existe, procedemos a eliminarlo
            const sql = "DELETE FROM public WHERE uuid = ?";
            await query(sql, [uuid]);

            // Si la eliminación fue exitosa, regresamos un mensaje de éxito
            return `Public successfully deleted.`;

        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            return null;
        }
    }
}
