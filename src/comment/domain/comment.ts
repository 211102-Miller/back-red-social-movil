export class Comment{
    constructor(
        public uuid:string,
        public id_user:string,
        public id_public:string,
        public text:string,
        public userName: String,
        public userNicKName:String
    ){}
}