// models/ClockOut.js
import mongoose from 'mongoose';

const ClockOutSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
  },
  formattedDate: {
    type: String,
    required: true,
  },
  formattedTime: {
    type: String,
    required: true,
  },
});

const ClockOut = mongoose.models.ClockOut || mongoose.model('ClockOut', ClockOutSchema);

export default ClockOut;
