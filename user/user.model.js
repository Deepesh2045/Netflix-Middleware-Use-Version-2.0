import mongoose from "mongoose";

const newUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max_length: 55,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    max_length: 55,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    max_length: 55,
    trim: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
    default: null,
  },
  gender: {
    type: String,
    required: false,
    default: null,
    enum: ["male", "female", "other"],
  },
});
export const User = mongoose.model("User",newUserSchema)