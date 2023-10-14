import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';


export class ValidatorCreateUser {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public last_name: string;

    @IsNotEmpty()
    @IsString()
    @Length(10) 
    public phone_number: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;


    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;

    constructor(
        uuid: string,
        name: string,
        last_name: string,
        phone_number: string,
        email: string,
        password: string,
        status: boolean
    ) {
        this.uuid = uuid;
        this.name = name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.email = email;
        this.password = password;
        this.status = status;
    }


}