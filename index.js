require("dotenv").config();
const express = require("express");
const mongooseConnection = require("./db.connection");
const authRouter = require("./Router/userRouter")

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
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
