import { IsString, IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";
import { Status } from "../entities/tasks.entity";

@InputType()
export class CreateTask {

    @Field()
    @IsString()
    @IsNotEmpty()
    title: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    content: string;
}

@InputType()
export class UpdateTask {

    @Field()
    @IsString()
    @IsOptional()
    title?: string;

    @Field()
    @IsOptional()
    @IsString()
    content?: string;

    @Field()
    @IsString()
    @IsOptional()
    @IsEnum(Status)
    status?: Status
}