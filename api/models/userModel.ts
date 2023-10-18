import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    password: String,
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;