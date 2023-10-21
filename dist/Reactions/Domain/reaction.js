"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reaction = void 0;
class Reaction {
    constructor(uuid, id_user, id_public, reaction, type) {
        this.uuid = uuid;
        this.id_user = id_user;
        this.id_public = id_public;
        this.reaction = reaction;
        this.type = type;
    }
}
exports.Reaction = Reaction;
