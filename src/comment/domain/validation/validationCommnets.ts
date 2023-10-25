import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional, IsNumber } from 'class-validator';


export class ValidationCreateCommnets{
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsUUID()
    public id_user: string;

    @IsNotEmpty()
    @IsUUID()
    public id_public: string;

    @IsString()
    @Length(1, 500)
    public text: string;

    @IsNotEmpty()
    @IsString()
    public userName: string;

    @IsNotEmpty()
    @IsString()
    public userNickName: string;


    
    constructor(
        uuid: string,
        id_user: string,
        id_public: string,
        text: string,
        userName: string,
        userNickName: string
    ) {
        this.uuid = uuid,
        this.id_user = id_user,
        this.id_public = id_public,
        this.text = text
        this.userName = userName,
        this.userNickName = userNickName;
    }
    
}

export class ValidatorId {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;
    constructor(uuid:string) {
        this.uuid = uuid
    }
}

export class ValidatorUpdateComment {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(1, 500)
    public text: string;

    constructor(uuid:string, text:string) {
        this.uuid = uuid,
        this.text = text
    }
}