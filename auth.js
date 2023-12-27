import express from "express";
import { SuccessResponse } from "../utils/APISuccessResponse.js";
import { FieldResponse } from "../utils/APIFaildRespons.js";
import dbConnection from "../db/dbConnection.js";
import { User } from "../modles/user.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home Page!");
});
// register route
router.post("/register", async (req, res) => {
  const { full_name, email, phone, work, password, conform_password } =
    req.body;

  if (
    !full_name ||
    !email ||
    !phone ||
    !work ||
    !password ||
    !conform_password
  ) {
    return res
      .status(422)
      .json(FieldResponse("Register field!", "Please enter all data", 422));
  }

  try {
    const email_match = await User.findOne({ email: email });

    if (email_match) {
      return res
        .status(422)
        .json(FieldResponse("User Found!", "User already exists!", 422));
    }

    const user = new User({
      full_name,
      email,
      phone,
      work,
      password,
      conform_password,
    });

    const savedObj = await user.save();

    if (savedObj) {
      return res
        .status(200)
        .json(SuccessResponse("User registered successfully!", 200, req.body));
    } else {
      return res
        .status(500)
        .json(
          FieldResponse("User registration failed!", "Data saving error!", 500)
        );
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        FieldResponse("User registration failed!", "Internal Server Error", 500)
      );
  }
});

// login route

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json(FieldResponse("Please fill all data!", "Data null!", 400));
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json(FieldResponse("Fill correct credential! ", "Invalid user!", 400));
    }
    return res.status(200).json(SuccessResponse("Welcome!", 200, user));
  } catch (error) {
    console.log(error);
  }
});

export default router;
