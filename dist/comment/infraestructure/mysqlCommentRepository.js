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
exports.MysqlCommentRepository = void 0;
const comment_1 = require("../domain/comment");
const msql_1 = require("../../database/msql");
class MysqlCommentRepository {
    createComment(uuid, id_user, id_public, text) {
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
                const sql = `
                INSERT INTO comments (uuid, id_user, id_public, text)
                VALUES (?, ?, ?, ?);
            `;
                const params = [uuid, id_user, id_public, text];
                const [result] = yield (0, msql_1.query)(sql, params);
                const newReaction = new comment_1.Comment(uuid, id_user, id_public, text);
                return newReaction;
            }
            catch (error) {
                console.error("Error adding reaction:", error);
                return null;
            }
        });
    }
    getAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM comments"; // Corregido el nombre de la tabla
                const [rows] = yield (0, msql_1.query)(sql);
                if (!Array.isArray(rows) || rows.length === 0) {
                    return null;
                }
                const comments = rows.map(row => {
                    return new comment_1.Comment(row.uuid, row.id_user, row.id_public, row.text // Corregido para coincidir con la estructura de la tabla
                    );
                });
                return comments;
            }
            catch (error) {
                console.error("Error fetching comments:", error);
                return null;
            }
        });
    }
    getpublicAllComments(id_public) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM comments  WHERE id_public = ?";
                const params = [id_public]; // Pasa idUser como argumento, no status
                const [result] = yield (0, msql_1.query)(sql, params);
                if (result && result.length > 0) {
                    // Mapea los resultados en objetos Public
                    const reactionUser = result.map((Data) => new comment_1.Comment(Data.uuid, Data.id_user, Data.id_public, Data.text));
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
    UpdateComment(uuid, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE comments SET text = ? WHERE uuid = ?';
                const result = yield (0, msql_1.query)(sql, [text, uuid]);
                // Verificar si se actualizó alguna fila
                if (!result || result.affectedRows === 0)
                    return null;
                // Obtener el usuario actualizado
                const [updatedRows] = yield (0, msql_1.query)('SELECT * FROM comments WHERE uuid = ?', [uuid]);
                if (updatedRows.length === 0)
                    return null;
                const updatedDescription = new comment_1.Comment(updatedRows[0].uuid, updatedRows[0].id_user, updatedRows[0].id_public, updatedRows[0].text);
                return updatedDescription;
            }
            catch (error) {
                console.error('Error updating description:', error);
                throw error; // O maneja el error de la manera que prefieras.
            }
        });
    }
    deleteCommnet(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Primero, verifiquemos si el libro con el uuid proporcionado existe
                const checkSql = "SELECT * FROM comments WHERE uuid = ?";
                const [existingPublic] = yield (0, msql_1.query)(checkSql, [uuid]);
                // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
                if (!Array.isArray(existingPublic) || existingPublic.length === 0) {
                    return null;
                }
                // Si el libro existe, procedemos a eliminarlo
                const sql = "DELETE FROM comments WHERE uuid = ?";
                yield (0, msql_1.query)(sql, [uuid]);
                // Si la eliminación fue exitosa, regresamos un mensaje de éxito
                return `Public successfully deleted.`;
            }
            catch (error) {
                console.error('Error al eliminar el libro:', error);
                return null;
            }
        });
    }
}
exports.MysqlCommentRepository = MysqlCommentRepository;
