import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/User.route.js'
import dotenv from "dotenv";
dotenv.config();
const app = express();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, (req, res) => {
  console.log("server is running");
});

app.use("/api/user",userRouter)
