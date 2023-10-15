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
    @IsNumber()
    public reactions: number;
    constructor(
        uuid: string,
        idUser: string,
        description: string,
        img_uer: string,
        reactions: number,
    ) {
        this.uuid = uuid,
        this.idUser = idUser,
        this.description = description,
        this.img_uer = img_uer,
        this.reactions = reactions
    }
}