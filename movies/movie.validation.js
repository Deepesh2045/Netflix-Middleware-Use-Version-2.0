import Yup from "yup";

export let movieValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .trim()
    .max(55, "Name must be at max 55 character"),
  language: Yup.string()
    .required("Language is required")
    .max(55, "Name must be at max 55 character"),
  genres: Yup.array().of(
    Yup.string().oneOf([
      "Drama",
      "Action",
      "Romance",
      "Thriller",
      "Comedy",
      "Crime",
      "Mystery",
      "Sci-Fi",
      "Horror",
      "Adventure",
      "Documentary",
      "History",
    ])
  ),

  duration: Yup.number().required("Duration is required").min(0),
  rating: Yup.number().required("Rating is required"),
});
