const mongoose = require("mongoose");

const connection = {};

const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using existing db connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log("Error while connecting to db", error);
        throw new Error("Error while connecting to db");
    }
};

module.exports = connectToDb;