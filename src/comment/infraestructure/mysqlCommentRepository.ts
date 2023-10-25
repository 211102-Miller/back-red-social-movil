import { Comment } from "../domain/comment";
import{query} from "../../database/msql";
import { CommentRespository } from "../domain/commetRepository";


export class MysqlCommentRepository implements CommentRespository{
    async createComment(uuid: string, id_user: string, id_public: string, text: string,userName:string,userNickName:string): Promise<Comment | null> {
        try {
            // Verifica si el usuario con el ID existe en la base de datos
            const userCheckSql = 'SELECT * FROM users WHERE uuid = ?';
            const userCheckParams = [id_user];
            const [userResult]: any = await query(userCheckSql, userCheckParams);
    
            if (userResult.length === 0) {
                // El usuario con el ID proporcionado no existe en la base de datos
                return null;
            }
    
            // Verifica si la publicación con el ID existe en la base de datos
            const publicCheckSql = 'SELECT * FROM public WHERE uuid = ?';
            const publicCheckParams = [id_public];
            const [publicResult]: any = await query(publicCheckSql, publicCheckParams);
    
            if (publicResult.length === 0) {
                // La publicación con el ID proporcionado no existe en la base de datos
                return null;
            }

    
            const sql = `
                INSERT INTO comments (uuid, id_user, id_public, text, userName, userNickname)
                VALUES (?, ?, ?, ?, ?, ?);
            `;
            const params = [uuid, id_user, id_public, text, userName, userNickName];
            const [result]: any = await query(sql, params);
    
            const newReaction: Comment = new Comment(uuid, id_user, id_public, text,userName,userNickName);
            return newReaction;
    
        } catch (error) {
            console.error("Error adding reaction:", error);
            return null;
        }
    }
    
    async getAllComments(): Promise<Comment[] | null> {
        try {
            const sql = "SELECT * FROM comments"; // Corregido el nombre de la tabla
            const [rows]: any = await query(sql);
    
            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }
    
            const comments: Comment[] = rows.map(row => {
                return new Comment(
                    row.uuid,
                    row.id_user,
                    row.id_public,
                    row.text,
                    row.userName,
                    row.userNickName // Corregido para coincidir con la estructura de la tabla
                );
            });
    
            return comments;
    
        } catch (error) {
            console.error("Error fetching comments:", error);
            return null;
        }
    }
    async getpublicAllComments(id_public: string): Promise<Comment[] | null> {
        try {
            const sql = "SELECT * FROM comments  WHERE id_public = ?";
            const params: any[] = [id_public]; // Pasa idUser como argumento, no status
    
            const [result]: any = await query(sql, params);
    
            if (result && result.length > 0) {
                // Mapea los resultados en objetos Public
                const reactionUser = result.map((Data: any) => new Comment(
                    Data.uuid,
                    Data.id_user,
                    Data.id_public,
                    Data.text,
                    Data.userName,
                    Data.userNickName
                ));
    
                return reactionUser;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error al obtener la lista de publicaciones del usuario:", error);
            return null;
        }
    }
    async UpdateComment(uuid: string, text: string): Promise<Comment | null> {
        try {
            const sql = 'UPDATE comments SET text = ? WHERE uuid = ?';
            const result: any = await query(sql, [text, uuid]);
    
            // Verificar si se actualizó alguna fila
            if (!result || result.affectedRows === 0) return null;
    
            // Obtener el usuario actualizado
            const [updatedRows]: any = await query('SELECT * FROM comments WHERE uuid = ?', [uuid]);
            if (updatedRows.length === 0) return null;
    
            const updatedDescription = new Comment(
                updatedRows[0].uuid,
                updatedRows[0].id_user,
                updatedRows[0].id_public,
                updatedRows[0].text,
                updatedRows[0].userName,
                updatedRows[0].userNickName
            );
    
            return updatedDescription;
        } catch (error) {
            console.error('Error updating description:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }
    async deleteCommnet(uuid: string): Promise< Comment |string | null> {
        try {
            // Primero, verifiquemos si el libro con el uuid proporcionado existe
            const checkSql = "SELECT * FROM comments WHERE uuid = ?";
            const [existingPublic]: any = await query(checkSql, [uuid]);

            // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
            if (!Array.isArray(existingPublic) || existingPublic.length === 0) {
                return null;
            }

            // Si el libro existe, procedemos a eliminarlo
            const sql = "DELETE FROM comments WHERE uuid = ?";
            await query(sql, [uuid]);

            // Si la eliminación fue exitosa, regresamos un mensaje de éxito
            return `Public successfully deleted.`;

        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            return null;
        }
    }

}