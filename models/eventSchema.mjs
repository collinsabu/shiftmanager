import mongoose from 'mongoose';
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  formattedDay: {
    type: String,
    required: true,
  },
  formattedTime: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default  Event;
