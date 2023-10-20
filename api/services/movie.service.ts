import MovieModel from "../models/movieModel";
import { CreateMovieInput } from "../types/movie";

class MovieService {
    async getMovies() {
        return MovieModel.find().lean().populate(['genres', 'actors']).sort({ popularity: -1, vote_average: -1, vote_count: -1 });
    }

    async findMovie(id: string) {
        const movie = await MovieModel.findById(id).lean().populate(['genres', 'actors']);
        if (!movie) throw new Error('Movie not found');
        return movie;
    }

    async createMovie(input: CreateMovieInput) {
        return MovieModel.create(input);
    }
}

export default MovieService;
