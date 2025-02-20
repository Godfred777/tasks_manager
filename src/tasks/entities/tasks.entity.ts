import { ObjectType, Field, ID, registerEnumType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { Project } from "src/projects/entities/projects.entity";
import { Status as PrismaStatus } from "@prisma/client";

@ObjectType()
export class Task {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field(() => Status)
    status: PrismaStatus;

    @Field(() => User)
    author: User;

    @Field(() => Project, {nullable:true})
    project: Project;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

export enum Status {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETE = 'COMPLETE'
}

registerEnumType(Status, {
    name:"Status",
    description: "Task status",
})