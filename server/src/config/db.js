import mongoose from "mongoose";

export const connectDb = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/travel_booking";
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
};
