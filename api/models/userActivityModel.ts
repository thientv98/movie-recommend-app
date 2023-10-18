import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    activityType: String, // 'favorite' or 'rate'
    rate: Number, // Include only if activityType is 'rate'
});

const UserActivityModel = mongoose.model('UserActivity', userActivitySchema);

export default UserActivityModel;