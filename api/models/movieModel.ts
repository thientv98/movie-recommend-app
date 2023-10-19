import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: String,
    overview: String,
    popularity: Number,
    release_date: Date,
    vote_average: Number,
    vote_count: Number,
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
    thumbnail: String,
    backdrop: String,
    time: Number
});

const MovieModel = mongoose.model('Movie', movieSchema);

export default MovieModel;