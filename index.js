require("dotenv").config();
const express = require("express");

const app = express();
const PPORT = process.env.PORT || 3000

  app.listen(PPORT,()=>{
  console.log(`Server started on Port:${PPORT}!`);
})