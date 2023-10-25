"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
class Comment {
    constructor(uuid, id_user, id_public, text, userName, userNicKName) {
        this.uuid = uuid;
        this.id_user = id_user;
        this.id_public = id_public;
        this.text = text;
        this.userName = userName;
        this.userNicKName = userNicKName;
    }
}
exports.Comment = Comment;
