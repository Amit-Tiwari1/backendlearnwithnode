import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

// password hashing

userSchema.pre("save", async function (next) {
  console.log("hii i am inside");
  if (this.isModified("password")) {
    try {
      // Hash the password and conform_password asynchronously
      const hashedPassword = await bcrypt.hash(this.password, 12);
      const hashedConformPassword = await bcrypt.hash(
        this.conform_password,
        12
      );

      // Assign the hashed values to the respective fields
      this.password = hashedPassword;
      this.conform_password = hashedConformPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      return next(error);
    }
  }
  next();
});

export const User = mongoose.model("User", userSchema);
