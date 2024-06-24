import mongoose, { Schema } from "mongoose";

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000, // Assuming 100 words maximum
  },
  formattedDate: {
    type: String,
    required: true,
  },
  formattedTime: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create the Todo model
const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);


module.exports = Todo;
