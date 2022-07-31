require("dotenv").config();
const express = require("express");
const mongooseConnection = require("./db.connection");
const authRouter = require("./modules/auth/auth.router");
const userRouter = require("./modules/user/user.router");

const app = express();
app.use(express.json());
app.use("/app", authRouter,userRouter);
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
 await mongooseConnection();
    app.listen(PORT, () => {
      console.log(`Server started on Port:${PORT}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
