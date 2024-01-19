import express from "express";
import { Movies } from "./movie.model.js";

const router = express.Router();

// add movie
router.post("/movies/add", async(req, res) => {
  console.log(req.body);
  const newMovies = req.body;
  await Movies.create(newMovies);

  return res.status(201).send({ message: "Movie added successfully" });
});

export default router;
