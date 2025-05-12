require("dotenv").config();
const mongoose = require('mongoose');

// MongoDB connection string - using environment variable or default to local MongoDB
const MONGODB_URI = process.env.DATABASE_CONNECT_LINK || 'mongodb://127.0.0.1:27017/recial-social-media-platform';

// Connect to MongoDB
const connectDB = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB connected successfully');
        return mongoose.connection;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Disconnect from MongoDB
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    } catch (error) {
        console.error('❌ Error disconnecting from MongoDB:', error);
    }
};

module.exports = { connectDB, disconnectDB, mongoose };