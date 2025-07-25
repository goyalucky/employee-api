import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectToDatabase = async () => {
  try { 
    await mongoose.connect(process.env.MONGODB_URL, {
    
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

export default connectToDatabase;
