import express from "express";
import { Movie } from "./movie.model.js";
import { validateReqBody } from "../middleware/validation.middleware.js";
import { movieValidationSchema } from "./movie.validation.js";
import { checkMongoIdValidity } from "../mongoValidity/check.mongo.validity.js";

const router = express.Router();


// add movie
router.post(
  "/movies/add",
  // use middleware function and call
  validateReqBody(movieValidationSchema),
  async (req, res) => {
    // extract movie from req.body
    const newMovie = req.body;
    // create movie
    await Movie.create(newMovie);
    // send response
    return res.status(200).send({ message: "Movie added successfully." });
  }
);

// get movie details by id
router.get("/movies/details/:id", checkMongoIdValidity, async (req, res) => {
  const movieId = req.params.id;
  // find movie
  const movie = await Movie.findOne({ _id: movieId });
  // if not movie throw erro
  if (!movie) {
    return res.status(400).sned({ message: "Movie does not exist" });
  }
  return res.status(200).send({ message: "Success", data: movie });
});

// delete movie
router.delete(
  "/movies/delete/:id",
  // check mongo id validity from middleware function
  checkMongoIdValidity,
  async (req, res) => {
    // extract movie id from req.params
    const movieId = req.params.id;
    // find movie
    const movie = await Movie.findOne({ _id: movieId });
    // if not movie throw error
    if (!movie) {
      return res.status(404).send({ message: "Movie does not exist" });
    }
    // delete movie
    await Movie.deleteOne({ _id: movieId });
    // send response
    return res.status(200).send({ message: "Movie deleted successfully" });
  }
);

// Edit Movie
router.put(
  "/movies/edit/:id",
  checkMongoIdValidity,
  validateReqBody(movieValidationSchema),
  async (req, res) => {
    // extract id from req.params
    const movieId = req.params.id;
    // extract id from req.body
    const newValues = req.body;
    // find movie
    const movie = await Movie.findOne({ _id: movieId });
    // if not movie
    if (!movie) {
      return res.status(404).send({ message: "Movie does not exist." });
    }
    // edit movie
    await Movie.updateOne(
      { _id: movieId },
      {
        $set: {
          ...newValues,
        },
      }
    );
    // send response
    return res.status(200).send({ message: "Movie is updated successfully" });
  }
);

export default router;
