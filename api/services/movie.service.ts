import MovieModel from "../models/movieModel";
import { CreateMovieInput } from "../types/movie";

class MovieService {
    async findMovies() {
        return MovieModel.find().lean().populate(['genres', 'actors']);
    }

    async createMovie(input: CreateMovieInput) {
        return MovieModel.create(input);
    }
}

export default MovieService;
