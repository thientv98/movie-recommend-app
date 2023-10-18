import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://thientv:KyBJcFm0NQBMAfZz@cluster0.q6d7wle.mongodb.net/movie-recommend-app?retryWrites=true&w=majority');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;