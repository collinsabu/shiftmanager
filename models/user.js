import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    hourlyRate: {
      type: Number,
      required: true,
    },
    monthlyTarget: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure emails are unique
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
