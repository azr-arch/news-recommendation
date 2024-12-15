import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        name: String,
        age: Number,
        country: String,
        interests: Array(String),
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model("User", User);
