"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlReactionRepository = void 0;
const msql_1 = require("../../database/msql");
const reaction_1 = require("../Domain/reaction");
class MysqlReactionRepository {
    createReaction(uuid, id_user, id_public, reaction, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verifica si el usuario con el ID existe en la base de datos
                const userCheckSql = 'SELECT * FROM users WHERE uuid = ?';
                const userCheckParams = [id_user];
                const [userResult] = yield (0, msql_1.query)(userCheckSql, userCheckParams);
                if (userResult.length === 0) {
                    // El usuario con el ID proporcionado no existe en la base de datos
                    return null;
                }
                // Verifica si la publicación con el ID existe en la base de datos
                const publicCheckSql = 'SELECT * FROM public WHERE uuid = ?';
                const publicCheckParams = [id_public];
                const [publicResult] = yield (0, msql_1.query)(publicCheckSql, publicCheckParams);
                if (publicResult.length === 0) {
                    // La publicación con el ID proporcionado no existe en la base de datos
                    return null;
                }
                // Verifica si el usuario ya tiene una reacción registrada para esta publicación
                const existingReactionSql = 'SELECT * FROM reactions WHERE id_user = ? AND id_public = ?';
                const existingReactionParams = [id_user, id_public];
                const [existingReactionResult] = yield (0, msql_1.query)(existingReactionSql, existingReactionParams);
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
                const [result] = yield (0, msql_1.query)(sql, params);
                const newReaction = new reaction_1.Reaction(uuid, id_user, id_public, reaction, type);
                return newReaction;
            }
            catch (error) {
                console.error("Error adding reaction:", error);
                return null;
            }
        });
    }
    deleteReaction(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Primero, verifiquemos si el libro con el uuid proporcionado existe
                const checkSql = "SELECT * FROM reactions WHERE uuid = ?";
                const [existingPublic] = yield (0, msql_1.query)(checkSql, [uuid]);
                // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
                if (!Array.isArray(existingPublic) || existingPublic.length === 0) {
                    return null;
                }
                // Si el libro existe, procedemos a eliminarlo
                const sql = "DELETE FROM reactions WHERE uuid = ?";
                yield (0, msql_1.query)(sql, [uuid]);
                // Si la eliminación fue exitosa, regresamos un mensaje de éxito
                return `Reactions successfully deleted.`;
            }
            catch (error) {
                console.error('Error al eliminar el libro:', error);
                return null;
            }
        });
    }
    getAllReactions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM reactions"; // Asumiendo que tu tabla se llama 'books'
                const [rows] = yield (0, msql_1.query)(sql);
                if (!Array.isArray(rows) || rows.length === 0) {
                    return null;
                }
                const reactions = rows.map(row => {
                    return new reaction_1.Reaction(row.uuid, row.id_user, row.id_public, row.reaction, row.type);
                });
                return reactions;
            }
            catch (error) {
                console.error("Error fetching reactions:", error);
                return null;
            }
        });
    }
    getReactionCommnet(type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM reactions  WHERE type = ?";
                const params = [type]; // Pasa idUser como argumento, no status
                const [result] = yield (0, msql_1.query)(sql, params);
                if (result && result.length > 0) {
                    // Mapea los resultados en objetos Public
                    const reactionUser = result.map((Data) => new reaction_1.Reaction(Data.uuid, Data.id_user, Data.id_public, Data.reaction, Data.type));
                    return reactionUser;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                console.error("Error al obtener la lista de publicaciones del usuario:", error);
                return null;
            }
        });
    }
    getReactionPublic(type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM reactions  WHERE type = ?";
                const params = [type]; // Pasa idUser como argumento, no status
                const [result] = yield (0, msql_1.query)(sql, params);
                if (result && result.length > 0) {
                    // Mapea los resultados en objetos Public
                    const reactionUser = result.map((Data) => new reaction_1.Reaction(Data.uuid, Data.id_user, Data.id_public, Data.reaction, Data.type));
                    return reactionUser;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                console.error("Error al obtener la lista de publicaciones del usuario:", error);
                return null;
            }
        });
    }
    getReactionByPublic(id_public) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM reactions  WHERE id_public = ?";
                const params = [id_public]; // Pasa idUser como argumento, no status
                const [result] = yield (0, msql_1.query)(sql, params);
                if (result && result.length > 0) {
                    // Mapea los resultados en objetos Public
                    const reactionUser = result.map((Data) => new reaction_1.Reaction(Data.uuid, Data.id_user, Data.id_public, Data.reaction, Data.type));
                    return reactionUser;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                console.error("Error al obtener la lista de publicaciones del usuario:", error);
                return null;
            }
        });
    }
}
exports.MysqlReactionRepository = MysqlReactionRepository;
