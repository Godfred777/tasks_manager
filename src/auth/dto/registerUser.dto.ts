import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}