import mongoose from 'mongoose';
import connectMongoDB from './mongodb.mjs';
import Event from '../models/eventSchema.mjs';
import nodemailer from 'nodemailer';
import mailjet from 'nodemailer-mailjet-transport';
import dotenv from 'dotenv';

dotenv.config();

// Set up Mailjet transport
const auth = {
  auth: {
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_API_SECRET,
  },
};

const nodemailerMailjet = nodemailer.createTransport(mailjet(auth));

async function sendEmail(event) {
  const mailOptions = {
    from: `Shift Manager App <collinsabu03@gmail.com>`, // Replace with your domain
    to: event.userEmail,
    subject: `Reminder: ${event.title}`,
    text: `This is a reminder for your event: ${event.title} on ${event.date}. Description: ${event.description}`,
    html: `
      <div style="background-color: #3EB489; padding: 20px; font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #ffffff; font-weight: bold; text-align: center; background-color: #18453B; ">Shift Alert!</h1>
          <p style="font-size: 16px;">Dear ${event.userEmail},</p>
          <p style="font-size: 16px;">This is a reminder for your upcoming shift scheduled by you:</p>
          <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
            <tr>
              <td style="border: 1px solid #dddddd; padding: 8px; font-weight: bold;">Title:</td>
              <td style="border: 1px solid #dddddd; padding: 8px;">${event.title}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dddddd; padding: 8px; font-weight: bold;">Date:</td>
              <td style="border: 1px solid #dddddd; padding: 8px;">${event.date}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dddddd; padding: 8px; font-weight: bold;">Description:</td>
              <td style="border: 1px solid #dddddd; padding: 8px;">${event.description}</td>
            </tr>
          </table>
          <p style="font-size: 16px; color: #18453B">Best regards,<br/>Shift Manager App</p>
        </div>
      </div>
    `,
  };

  console.log('Email details:', mailOptions);

  try {
    const info = await nodemailerMailjet.sendMail(mailOptions);
    console.log(`Email sent to ${event.userEmail} for event ${event._id}`, info);
  } catch (error) {
    console.error(`Failed to send email for event ${event._id}:`, error);
  }
}

async function sendNotifications() {
  try {
    await connectMongoDB();
    console.log('MongoDB connected successfully');

    const now = new Date();
    const fourHoursLater = new Date(now.getTime() + 4 * 60 * 60 * 1000);

    const events = await Event.find({
      date: {
        $gte: now,
        $lte: fourHoursLater,
      },
    });

    for (const event of events) {
      await sendEmail(event);
    }
  } catch (error) {
    console.error('Error in sendNotifications:', error);
  }
}

export default sendNotifications;
