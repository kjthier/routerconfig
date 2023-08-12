import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

export default connectDB;
