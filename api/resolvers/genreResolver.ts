import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { CreateGenreInput, Genre } from '../types/genre';
import GenreModel from '../models/genreModel';

@Resolver(Genre)
export class GenreResolver {
    @Query(() => [Genre])
    async getAllGenres() {
        return GenreModel.find();
    }

    @Mutation(() => Genre)
    createGenre(
        @Arg("input") input: CreateGenreInput
    ) {
        return GenreModel.create(input);
    }
}
