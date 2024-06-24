import mongoose, { Schema } from "mongoose";

const clockInSchema = new Schema({
  organization: {
    type: String,
    required: true,
    trim: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 0,
  },
  shiftType: {
    type: String,
    required: true,
    enum: ['regular', 'overtime'],
  },
  clockInTime: {
    type: Date,
    required: true,
  },
  clockOutTime: {
    type: Date,
    required: true,
  },
  formattedClockInTime: {
    type: String,
    required: true,
  },
  formattedClockOutTime: {
    type: String,
    required: true,
  },
  formattedDate: {
    type: String,
    required: true,
  },
});
const ClockIn = mongoose.models.ClockIn || mongoose.model("ClockIn", clockInSchema);

export default ClockIn;
