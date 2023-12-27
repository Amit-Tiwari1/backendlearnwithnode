import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to db");
  } catch (error) {
    console.log("Error connectiong to db", error);
  }
};

export default dbConnection;
