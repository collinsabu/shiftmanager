import cron from 'node-cron';
import sendNotifications from './sendNotification.mjs'; // Adjust the path as necessary
import connectMongoDB from './mongodb.mjs'; // Ensure this file connects to MongoDB and exports the connection
import mongoose from 'mongoose';

// Connect to MongoDB when the scheduler starts
(async () => {
  try {
    await connectMongoDB();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
})();

// Initialize the scheduler to run every minute
cron.schedule('* * * * *', async () => {
  console.log('Running scheduled task to check for upcoming events');
  try {
    await sendNotifications();
  } catch (error) {
    console.error('Error during scheduled task:', error);
  }
});

// Ensure MongoDB connection is closed gracefully on exit
process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing MongoDB connection');
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing MongoDB connection');
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
