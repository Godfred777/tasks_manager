import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RegisterUserDto {

    @Field()
    @IsString()
    @IsNotEmpty()
    username: string;

    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}