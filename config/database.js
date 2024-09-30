import mongoose from "mongoose";

const connectDB = ()=>{
  try {
     mongoose.connect(process.env.mongoUri)
     console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

export default connectDB()