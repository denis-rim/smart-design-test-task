import mongoose from "mongoose";

async function connectDB() {
  const dbUri = "mongodb://localhost:27017/mongo";

  try {
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
}

export default connectDB;
