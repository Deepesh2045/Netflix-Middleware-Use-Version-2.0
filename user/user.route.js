import express from "express";
import { User } from "./user.model.js";
import { addUserSchema } from "./user.validation.js";
import { validateSchema_ReqBody } from "../middleware/validation.middleware.js";

const router = express.Router();

// add new user
// router.post("/user/add", async (req, res) => {
//   // extract user from req.body
//   const newUser = req.body;
//   let validatedData;
//   try {
//     validatedData = await addUserSchema.validate(newUser);
//   } catch (error) {
//     return res.status(400).send({ message: error.message });
//   }
//   // Check user with email already exist
//   const checkUser = await User.findOne({ email: newUser.email });
//   // If email exist throw error msg
//   if (checkUser) {
//     return res.status(409).send({ message: "User email already exist" });
//   }

//   await User.create(validatedData);
//   return res.status(200).send({ message: "New user added successfully..." });
// });

//! Try optional method middleware
router.post(
  "/user/add",
  // async (req, res, next) => {
  //   // extract user from req.body
  //   const newUser = req.body;
  //   // validate new user
  //   try {
  //     const validatedData = await addUserSchema.validate(newUser);
  //     req.body = validatedData;
  //     //call next
  //     next();
  //     // throw error response
  //   } catch (error) {
  //     return res.status(409).send({ message: error.message });
  //   }
  // },
  validateSchema_ReqBody(addUserSchema),
  async (req, res) => {
    // extract new user from req.body
    const newUser = req.body;
    // check email already exist
    const existUser = await User.findOne({ email: newUser.email });
    // if email exist
    if (existUser) {
      return res.status(404).send({ message: "User email is already exist." });
    }
    // create user
    await User.create(newUser);
    return res.status(200).send({ message: "New user added successfully" });
  }
);
export default router;
