import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional, IsNumber } from 'class-validator';


export class ValidationCreateReaction{
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
    public reaction: string;

    @IsNotEmpty()
    @IsString()
    public type: string;


    
    constructor(
        uuid: string,
        id_user: string,
        id_public: string,
        reaction: string,
        type: string
    ) {
        this.uuid = uuid,
        this.id_user = id_user,
        this.id_public = id_public,
        this.reaction = reaction,
        this.type = type
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