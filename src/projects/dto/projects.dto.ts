import { IsString, IsNotEmpty } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateProjectDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsString()
    description: string;
}

@InputType()
export class UpdateProjectDto {
    @Field()
    @IsString()
    name: string;

    @Field()
    @IsString()
    description: string;
}
