import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class Project {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field({nullable:true})
    description: string;

    @Field(() => User)
    author: User;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}