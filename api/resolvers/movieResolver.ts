import { Resolver, Query, Arg, Mutation, ID } from 'type-graphql';
import { CreateMovieInput, Movie } from '../types/movie';
import MovieModel from '../models/movieModel';
import MovieService from '../services/movie.service';
import UserActivityModel from '../models/userActivityModel';

@Resolver(Movie)
export class MovieResolver {
    constructor(private movieService: MovieService) {
        this.movieService = new MovieService();
    }

    @Query(() => Movie)
    async getMovie(@Arg('id') id: string) {
        const movie = await MovieModel.findById(id);
        if (!movie) throw new Error('Movie not found');
        return movie;
    }

    @Query(() => [Movie])
    async getAllMovies() {
        return MovieModel.find();
    }

    @Query(() => [Movie])
    async getMovies() {
        return this.movieService.findMovies();
    }

    // @Authorized()
    @Mutation(() => Movie)
    async createMovie(
        @Arg("input") input: CreateMovieInput,
    ) {
        return this.movieService.createMovie({ ...input });
    }

    @Query(() => [Movie])
    async recommendMovies() {
        const userId = '652e9f49c1b447e9e064c27d';
        const userActivities = await UserActivityModel.find({ user: userId });

        let userPreferences: any = { genres: [], actors: [] };

        if (userActivities.length > 0) {
            // Calculate user preferences based on user activities
            userPreferences = await userActivities.reduce(async (preferences, activity) => {
                if (activity.activityType === 'favorite' || (activity.activityType === 'rate' && (activity?.rate && activity?.rate >= 4))) {
                    const movie = await MovieModel.findOne({ _id: activity?.movie?.toHexString() });

                    if (movie) {
                        preferences.genres.push(...movie.genres);
                        preferences.actors.push(...movie.actors);
                    }
                }
                return preferences;
            }, userPreferences);
        }

        // Recommendation logic based on user preferences
        let recommendedMovies = [];

        if (userPreferences.genres.length > 0 || userPreferences.actors.length > 0) {
            // Find movies with matching genres or actors
            recommendedMovies = await MovieModel.find({
                $or: [
                    { genres: { $in: userPreferences.genres } },
                    { actors: { $in: userPreferences.actors } },
                ],
            }).sort({ popularity: -1, vote_average: -1, vote_count: -1 });
        } else {
            // If no user preferences, recommend popular movies
            recommendedMovies = await MovieModel
                .find({})
                .sort({ popularity: -1, vote_average: -1, vote_count: -1 });
        }

        return recommendedMovies;
    }
}
