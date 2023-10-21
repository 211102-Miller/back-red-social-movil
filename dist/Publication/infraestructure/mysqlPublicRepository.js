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
exports.MysqlPublicRepository = void 0;
const msql_1 = require("../../database/msql");
const public_1 = require("../domain/public");
class MysqlPublicRepository {
    createPublicFile(uuid, idUser, description, url_file, type_file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Primero, verifica si el usuario con el UUID existe en la base de datos
                const userCheckSql = `
                SELECT * FROM users WHERE uuid = ?;
            `;
                const userCheckParams = [idUser];
                console.log(userCheckParams);
                const [userResult] = yield (0, msql_1.query)(userCheckSql, userCheckParams);
                if (userResult.length === 0) {
                    // El usuario con el UUID proporcionado no existe en la base de datos
                    console.log("dasdasdasd");
                    return null;
                }
                // El usuario existe, ahora puedes insertar el nuevo registro en la tabla "public"
                const sql = `
                INSERT INTO public (uuid, idUser, description, url_file, type_file)
                VALUES (?, ?, ?, ?, ?);
            `;
                const params = [uuid, idUser, description, url_file, type_file];
                const [result] = yield (0, msql_1.query)(sql, params);
                const newPublic = new public_1.Public(uuid, idUser, description, url_file, type_file);
                return newPublic;
            }
            catch (error) {
                console.error("Error adding content:", error);
                return null;
            }
        });
    }
    getAllPublications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM public"; // Asumiendo que tu tabla se llama 'books'
                const [rows] = yield (0, msql_1.query)(sql);
                if (!Array.isArray(rows) || rows.length === 0) {
                    return null;
                }
                const books = rows.map(row => {
                    return new public_1.Public(row.uuid, row.idUser, row.description, row.url_file, row.type_file);
                });
                return books;
            }
            catch (error) {
                console.error("Error fetching books:", error);
                return null;
            }
        });
    }
    getByPublication(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM public WHERE uuid = ?";
                const [rows] = yield (0, msql_1.query)(sql, [uuid]);
                // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
                if (!Array.isArray(rows) || rows.length === 0) {
                    return null;
                }
                const row = rows[0]; // Como estamos buscando por ID, sólo debe haber una coincidencia
                const publics = new public_1.Public(row.uuid, row.idUser, row.description, row.url_file, row.type_file);
                return publics;
            }
            catch (error) {
                console.error('Error al obtener el libro:', error);
                return null;
            }
        });
    }
    getByUserPublication(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM public WHERE idUser = ?";
                const params = [idUser]; // Pasa idUser como argumento, no status
                const [result] = yield (0, msql_1.query)(sql, params);
                if (result && result.length > 0) {
                    // Mapea los resultados en objetos Public
                    const publicsUser = result.map((publicData) => new public_1.Public(publicData.uuid, publicData.idUser, publicData.description, publicData.url_file, publicData.type_file));
                    return publicsUser;
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
    updateDescription(uuid, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE public SET description = ? WHERE uuid = ?';
                const result = yield (0, msql_1.query)(sql, [description, uuid]);
                // Verificar si se actualizó alguna fila
                if (!result || result.affectedRows === 0)
                    return null;
                // Obtener el usuario actualizado
                const [updatedRows] = yield (0, msql_1.query)('SELECT * FROM public WHERE uuid = ?', [uuid]);
                if (updatedRows.length === 0)
                    return null;
                const updatedDescription = new public_1.Public(updatedRows[0].uuid, updatedRows[0].idUserName, updatedRows[0].description, updatedRows[0].url_file, updatedRows[0].type_file);
                return updatedDescription;
            }
            catch (error) {
                console.error('Error updating description:', error);
                throw error; // O maneja el error de la manera que prefieras.
            }
        });
    }
    deletePublication(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Primero, verifiquemos si el libro con el uuid proporcionado existe
                const checkSql = "SELECT * FROM public WHERE uuid = ?";
                const [existingPublic] = yield (0, msql_1.query)(checkSql, [uuid]);
                // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
                if (!Array.isArray(existingPublic) || existingPublic.length === 0) {
                    return null;
                }
                // Si el libro existe, procedemos a eliminarlo
                const sql = "DELETE FROM public WHERE uuid = ?";
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
exports.MysqlPublicRepository = MysqlPublicRepository;
