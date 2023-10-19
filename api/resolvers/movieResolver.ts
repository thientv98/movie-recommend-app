import { Resolver, Query, Arg, Mutation, ID } from 'type-graphql';
import { CreateMovieInput, Movie } from '../types/movie';
import MovieModel from '../models/movieModel';
import MovieService from '../services/movie.service';
import UserActivityModel from '../models/userActivityModel';
import axios from 'axios';
import GenreModel from '../models/genreModel';
import ActorModel from '../models/actorModel';
import { stringToNumber } from '../utils';

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

    @Query(() => [String])
    async crawl(@Arg("page") page: Number) {
        const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDVjYzliNWJiOGYyZjY5ZDMwNjMzMzBmZjk3ZDY4ZCIsInN1YiI6IjY1MmExNDRhMWYzZTYwMDBjNTg4ZTg2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x060wMTTnSzyJppQ8ecb0NTTlowsxx8mYvZzuCocm4Q'
            }
        };
        const done = []

        const movieData = await axios(url, options);
        movieData.data.results.map(async (item: any) => {
            // get movie detail
            const movieDetail = await axios(`https://api.themoviedb.org/3/movie/${item.id}?language=en-US`, options);

            const genresIds: any = [];
            for await (const genre of movieDetail.data.genres) {
                const find = await GenreModel.findOne({ name: genre.name }).lean()
                if (find) {
                    genresIds.push(find._id)
                } else {
                    const newGenre = await GenreModel.create({
                        name: genre.name
                    })
                    genresIds.push(newGenre._id)
                }
            }

            const credits = await axios(`https://api.themoviedb.org/3/movie/299054/credits?language=en-US`, options)
            const castIds: any = []
            for await (const cast of credits.data.cast) {
                const find = await ActorModel.findOne({ name: cast.name }).lean()
                if (find) {
                    castIds.push(find._id)
                } else {
                    const newItem = await ActorModel.create({
                        name: cast.name,
                        avatar: cast.profile_path,
                    })
                    castIds.push(newItem._id)
                }
            }

            const movie = await MovieModel.findOne({ title: item.title }).lean()
            if (!movie) {
                console.log('create movie', item.id);

                // create movie
                MovieModel.create({
                    title: item.title,
                    overview: item.overview,
                    popularity: stringToNumber(item.popularity),
                    release_date: item.release_date,
                    vote_average: stringToNumber(item.vote_average),
                    vote_count: stringToNumber(item.vote_count),
                    genres: genresIds,
                    actors: castIds,
                    thumbnail: item.poster_path,
                    backdrop: item.backdrop_path,
                    time: stringToNumber(item.runtime)
                })
            }
            done.push(item.id)

            if (done.length == movieData.data.results.length) {
                console.log('done');
            }
        })

        return "OK";
    }
}
