import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { Genre } from './genre';
import { Actor } from './actor';
import { IsDate, IsNumber, IsString } from 'class-validator';

@ObjectType()
export class Movie {
    @Field((type) => ID)
    _id: string;

    @Field()
    title: string;

    @Field()
    overview: string;

    @Field()
    popularity: number;

    @Field()
    release_date: Date;

    @Field()
    vote_average: number;

    @Field()
    vote_count: number;

    @Field((type) => [Genre])
    genres: Genre[];

    @Field((type) => [Actor])
    actors: Actor[];

    @Field()
    thumbnail: string;

    @Field()
    backdrop: string;

    @Field()
    time: number;
}

@InputType()
export class CreateMovieInput {
    @IsString()
    @Field(() => String)
    title: string;

    @IsString()
    @Field()
    overview: string;

    @IsNumber()
    @Field()
    popularity: number;

    @IsDate()
    @Field()
    release_date: Date

    @IsNumber()
    @Field()
    vote_average: number;

    @IsNumber()
    @Field()
    vote_count: number;

    @IsString({ each: true })
    @Field(() => [String])
    genres: string[];

    @IsString({ each: true })
    @Field(() => [String])
    actors: string[];

    @IsString()
    @Field()
    thumbnail: string;
}