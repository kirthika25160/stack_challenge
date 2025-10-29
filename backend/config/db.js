import mongoose from "mongoose";

export const connectDB = async ()=> {
    await mongoose.connect("mongodb+srv://kirthika25160_db_user:quizapp12@cluster0.drfgwhx.mongodb.net/QuizApp")
    .then(()=> { console.log('DB connected')})
}