import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load variables from .env file

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.error("DB connection failed:", err.message);
    });
};

