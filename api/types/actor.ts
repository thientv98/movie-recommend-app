import { IsString } from 'class-validator';
import { ObjectType, Field, ID, InputType } from 'type-graphql';

@ObjectType()
export class Actor {
    @Field((type) => ID)
    _id: string;

    @Field()
    name: string;

    @Field(() => String, { nullable: true })
    avatar: string;
}

@InputType()
export class CreateActorInput {
    @IsString()
    @Field()
    name: string;

    @IsString()
    @Field()
    avatar: string;
}