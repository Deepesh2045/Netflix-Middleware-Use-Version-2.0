import express from "express";
import { addUserSchema } from "./user.validation.js";
import { User } from "./user.model.js";

const router = express.Router();

// add new user
router.post("/user/add", async (req, res) => {
  // extract user from req.body
  const newUser = req.body;
  let validatedData;
  try {
    validatedData = await addUserSchema.validate(newUser);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  // Check user with email already exist
  const checkUser = await User.findOne({ email: newUser.email });
  // If email exist throw error msg
  if (checkUser) {
    return res.status(409).send({ message: "User email already exist" });
  }

  await User.create(validatedData);
  return res.status(200).send({ message: "New user added successfully..." });
});
export default router;
