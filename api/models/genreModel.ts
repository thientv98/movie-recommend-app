import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
    name: String,
});

const GenreModel = mongoose.model('Genre', genreSchema);

export default GenreModel;