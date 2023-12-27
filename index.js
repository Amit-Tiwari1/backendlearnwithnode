import express from "express";
import dbConnection from "./db/dbConnection.js";
import dotenv from "dotenv";
import { User } from "./modles/user.model.js";
import authRouter from "./router/auth.js";

dotenv.config();

const app = express();
// to get support json this app
app.use(express.json());
// middleware
app.use(authRouter);
const my_middleware = (req, res, next) => {
  console.log("middleware working");
  next();
};

app.get("/", (req, res) => {
  res.send("Home Page from index file!");
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
  dbConnection();
});
