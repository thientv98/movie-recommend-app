import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { Movie } from './movie';
import { User } from './user';
import { IsNumber, IsString } from 'class-validator';

@ObjectType()
export class UserActivity {
    @Field((type) => ID)
    _id: string;

    @Field((type) => User)
    user: User;

    @Field((type) => Movie)
    movie: Movie;

    @Field()
    activityType: string; // 'favorite' or 'rate'

    @Field({ nullable: true })
    rate?: number; // Include only if activityType is 'rate'
}

@InputType()
export class SaveUserActivityInput {
    @IsString()
    @Field()
    user: string

    @IsString()
    @Field()
    movie: string

    @IsString()
    @Field()
    activityType: string

    @IsNumber()
    @Field()
    rate: number
}