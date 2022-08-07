require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./modules/user/user.model");
const bcrypt = require("bcrypt");

const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo connection has been established");
  })
  .catch((err) => {
    console.log(err);
  });

const SEEDPRODUCTS = [
  { userName: "Mykola", password: bcrypt.hashSync("Mykola", 8), role: "ADMIN" },
  {
    userName: "Ivan",
    password: bcrypt.hashSync("Ivan", 8),
    role: "BOSS",
  },
  {
    userName: "Mykhaylo",
    password: bcrypt.hashSync("Mykhaylo", 8),
    role: "USER",
  },
  { userName: "User", password: bcrypt.hashSync("Mykola", 8), role: "USER" },
  { userName: "User1", password: bcrypt.hashSync("User1", 8), role: "USER" },
  { userName: "User2", password: bcrypt.hashSync("User2", 8), role: "USER" },
  { userName: "User3", password: bcrypt.hashSync("User3", 8), role: "USER" },
  { userName: "User4", password: bcrypt.hashSync("User4", 8), role: "USER" },
  { userName: "User5", password: bcrypt.hashSync("User5", 8), role: "USER" },
  { userName: "User6", password: bcrypt.hashSync("User6", 8), role: "USER" },
  { userName: "User7", password: bcrypt.hashSync("User7", 8), role: "USER" },
  { userName: "User8", password: bcrypt.hashSync("User8", 8), role: "USER" },
  { userName: "User9", password: bcrypt.hashSync("User9", 8), role: "USER" },
];
const seedDB = async () => {
    await User.deleteMany({})
    await User.insertMany(SEEDPRODUCTS);
  }
seedDB().then(() => {
  mongoose.connection.close();
  console.log("Success");
});
