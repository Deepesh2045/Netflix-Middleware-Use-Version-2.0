import express from "express";
import { Movies } from "./movie.model.js";
import mongoose from "mongoose";

const router = express.Router();

//! Add Movies
router.post("/movies/add", async (req, res) => {
  console.log(req.body);
  const newMovies = req.body;
  await Movies.create(newMovies);

  return res.status(201).send({ message: "Movie added successfully" });
});
//! Get Movies Details by ID
router.get("/movies/details/:id", async (req, res) => {
  // Extract Id from req.params
  const movieId = req.params.id;
  // Check for mongo Id validity
  const isValidMongoId = mongoose.Types.ObjectId.isValid(movieId);
  // If not mongo id valid throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo Id..." });
  }
  // Find valid movie
  const requiredMovie = await Movies.findOne({ _id: movieId });
  // If not required throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exist" });
  }

  return res.status(200).send({ message: "Success...", Movies: requiredMovie });
});

//! Deleted movie by Id
router.delete("/movies/delete/:id", async (req, res) => {
  // Extract id from req.params
  const movieId = req.params.id;
  // Check for mongo id validity
  const isValidMongoId = mongoose.Types.ObjectId.isValid(movieId);
  // If not valid mongo id throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo Id..." });
  }
  // Find valid movie
  const requiredMovie = await Movies.findOne({ _id: movieId });
  //If not required throw error msg
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exist" });
  }
  // Delete movie by id
  await Movies.deleteOne({ _id: movieId });
  return res.status(201).send({ message: "Movie deleted successfully..." });
});

//! Edit movie by id
router.put("/movies/edit/:id", async (req, res) => {
  // Extract id from req.params
  const movieId = req.params.id;
  // Check from mongo id validity
  const isValidMongoId = mongoose.Types.ObjectId.isValid(movieId);
  // if not valid mongo id throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id..." });
  }
  // find valid movie
  const requiredMovie = await Movies.findOne({ _id: movieId });
  // if not required throw error msg
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exist" });
  }
  // Extract update value from req.body
  const updateValue = req.body;
  // Update values
  await Movies.updateOne(
    { _id: movieId },
    {
      $set: {
        ...updateValue,
      },
    }
  );

  return res.status(202).send({ message: "Movie Edited Successfully..." });
});

export default router;
