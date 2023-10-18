import mongoose from 'mongoose';

const actorSchema = new mongoose.Schema({
    name: String,
    avatar: String,
});

const ActorModel = mongoose.model('Actor', actorSchema);

export default ActorModel;