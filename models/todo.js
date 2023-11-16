import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
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
