import { IsString } from 'class-validator';
import { ObjectType, Field, ID, InputType } from 'type-graphql';

@ObjectType()
export class Genre {
    @Field((type) => ID)
    _id: string;

    @Field()
    name: string;
}

@InputType()
export class CreateGenreInput {
    @IsString()
    @Field(() => String)
    name: string;
}