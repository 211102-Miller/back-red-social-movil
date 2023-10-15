export class Reaction{
    constructor(
        public uuid: string,
        public id_user: string,
        public id_public: string,
        public reaction:     string,
        public type: string,
    ){}
}