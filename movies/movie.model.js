import mongoose from "mongoose";

// model => table

// set rules(schema)
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  language: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    required: true,
  },
});

//create table
export const Movies = mongoose.model("Movies", movieSchema);
