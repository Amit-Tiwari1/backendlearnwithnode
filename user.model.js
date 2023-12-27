import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  conform_password: {
    type: String,
    required: [true, "Password is required!"],
  },
});

export const User = mongoose.model("User", userSchema);
