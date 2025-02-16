import { IsString, IsEmail, IsNotEmpty } from "class-validator";  
import { Field, InputType } from "@nestjs/graphql";  

@InputType()
export class LoginDto {
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;
}