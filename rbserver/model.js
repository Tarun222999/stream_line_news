import mongoose from 'mongoose';


const newsSchema = new mongoose.Schema({
    title: String,
    href: String,
    score: String,
    user: String,
    age: String,
    comments: String,
}, { timestamps: true });

export default mongoose.model("News", newsSchema);