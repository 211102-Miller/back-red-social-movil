import { query } from "../../database/msql";
import { Reaction } from "../Domain/reaction";
import { ReactionRepository } from "../Domain/reactionsRespository";


export class MysqlReactionRepository implements ReactionRepository{

    async createReaction(uuid: string, id_user: string, id_public: string, reaction: string, type: string): Promise<Reaction | null> {
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
    
            // Verifica si el usuario ya tiene una reacción registrada para esta publicación
            const existingReactionSql = 'SELECT * FROM reactions WHERE id_user = ? AND id_public = ?';
            const existingReactionParams = [id_user, id_public];
            const [existingReactionResult]: any = await query(existingReactionSql, existingReactionParams);
    
            if (existingReactionResult.length > 0) {
                // El usuario ya tiene una reacción registrada para esta publicación
                return null;
            }
    
            // Ambos el usuario y la publicación existen, y el usuario no ha reaccionado previamente
            // Ahora puedes insertar la nueva reacción
            const sql = `
                INSERT INTO reactions (uuid, id_user, id_public, reaction, type)
                VALUES (?, ?, ?, ?, ?);
            `;
            const params = [uuid, id_user, id_public, reaction, type];
            const [result]: any = await query(sql, params);
    
            const newReaction: Reaction = new Reaction(uuid, id_user, id_public, reaction, type);
            return newReaction;
    
        } catch (error) {
            console.error("Error adding reaction:", error);
            return null;
        }
    }

    async deleteReaction(uuid: string): Promise<string | null> {
        try {
            // Primero, verifiquemos si el libro con el uuid proporcionado existe
            const checkSql = "SELECT * FROM reactions WHERE uuid = ?";
            const [existingPublic]: any = await query(checkSql, [uuid]);

            // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
            if (!Array.isArray(existingPublic) || existingPublic.length === 0) {
                return null;
            }

            // Si el libro existe, procedemos a eliminarlo
            const sql = "DELETE FROM reactions WHERE uuid = ?";
            await query(sql, [uuid]);

            // Si la eliminación fue exitosa, regresamos un mensaje de éxito
            return `Reactions successfully deleted.`;

        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            return null;
        }
    }
    async getAllReactions(): Promise<Reaction[] | null> {
        try {
            const sql = "SELECT * FROM reactions"; // Asumiendo que tu tabla se llama 'books'
            const [rows]: any = await query(sql);

            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const reactions: Reaction[] = rows.map(row => {
                return new Reaction(
                    row.uuid,
                    row.id_user,
                    row.id_public,
                    row.reaction,
                    row.type
                );
            });

            return reactions;

        } catch (error) {
            console.error("Error fetching reactions:", error);
            return null;
        }
    }
    async getReactionCommnet(type: string): Promise<Reaction[] | null> {
        try {
            const sql = "SELECT * FROM reactions  WHERE type = ?";
            const params: any[] = [type]; // Pasa idUser como argumento, no status
    
            const [result]: any = await query(sql, params);
    
            if (result && result.length > 0) {
                // Mapea los resultados en objetos Public
                const reactionUser = result.map((Data: any) => new Reaction(
                    Data.uuid,
                    Data.id_user,
                    Data.id_public,
                    Data.reaction,
                    Data.type
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
    async getReactionPublic(type: string): Promise<Reaction[] | null> {
        try {
            const sql = "SELECT * FROM reactions  WHERE type = ?";
            const params: any[] = [type]; // Pasa idUser como argumento, no status
    
            const [result]: any = await query(sql, params);
    
            if (result && result.length > 0) {
                // Mapea los resultados en objetos Public
                const reactionUser = result.map((Data: any) => new Reaction(
                    Data.uuid,
                    Data.id_user,
                    Data.id_public,
                    Data.reaction,
                    Data.type
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

    async getReactionByPublic(id_public: string): Promise<Reaction[] | null> {
        try {
            const sql = "SELECT * FROM reactions  WHERE id_public = ?";
            const params: any[] = [id_public]; // Pasa idUser como argumento, no status
    
            const [result]: any = await query(sql, params);
    
            if (result && result.length > 0) {
                // Mapea los resultados en objetos Public
                const reactionUser = result.map((Data: any) => new Reaction(
                    Data.uuid,
                    Data.id_user,
                    Data.id_public,
                    Data.reaction,
                    Data.type
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
    
    
}