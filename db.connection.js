const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const mongooseConnection = () => {
  mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log(`Mongo server connected seccessfully!`);
    }
  );
};

module.exports = mongooseConnection;  