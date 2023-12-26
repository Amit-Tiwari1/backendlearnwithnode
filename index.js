import express from "express";
import mongoose from "mongoose";
import { connectToDatabase } from "./db/dbConnection.js";

const app = express();

const db = connectToDatabase();

// middleware
const my_middleware = (req, res, next) => {
  console.log("middleware working");
  next();
};

app.get("/", (req, res) => {
  res.send("Home Page!");
});

app.get("/about", my_middleware, (req, res) => {
  res.send("About Page!");
});

app.get("/contact", (req, res) => {
  res.send("Contact Page!");
});

app.get("/login", (req, res) => {
  res.send("Login Page!");
});

app.listen("3000", () => {
  console.log("Server is listening: at 3000 ");
});
