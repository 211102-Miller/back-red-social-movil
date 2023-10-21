import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional, IsNumber } from 'class-validator';


export class ValidationCreatePublic{
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsUUID()
    public idUser: string;

    @IsString()
    @Length(1, 500)
    public description: string;

    @IsNotEmpty()
    @IsString()
    public img_uer: string;


    @IsNotEmpty()
    @IsString()
    public type_file: string;

    constructor(
        uuid: string,
        idUser: string,
        description: string,
        img_uer: string,
        type_file: string,
    ) {
        this.uuid = uuid,
        this.idUser = idUser,
        this.description = description,
        this.img_uer = img_uer,
        this.type_file = type_file
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

export class ValidatorUpdateDescription {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(1, 500)
    public description: string;

    constructor(uuid:string, description:string) {
        this.uuid = uuid,
        this.description = description
    }
}