import { IsOptional, IsString } from 'class-validator';
import { ObjectType, Field, ID, InputType } from 'type-graphql';

@ObjectType()
export class User {
    @Field((type) => ID)
    _id: string;

    @Field()
    name: string;

    @Field(() => String, { nullable: true })
    avatar: string;
}

@InputType()
export class CreateUserInput {
    @IsString()
    @Field(() => String)
    name: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    avatar?: string;
}