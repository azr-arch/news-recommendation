import mongoose from "mongoose";

type DBConnection = {
    isConnected?: number;
};

const connection: DBConnection = {};

export const dbConnect = async () => {
    if (connection.isConnected) {
        console.log("Already connected to database!");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
        connection.isConnected = db.connections[0].readyState;

        console.log("Database Connected!");
    } catch (error) {
        console.log("Database connection failed: ", error);

        process.exit(1);
    }
};
