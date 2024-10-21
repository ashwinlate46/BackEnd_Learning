const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URL;
        if (!uri) {
            throw new Error('Database URI not found in environment variables');
        }
        await mongoose.connect(uri, {
           
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = { connectDB };
