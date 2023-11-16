import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("todo", todoSchema);
