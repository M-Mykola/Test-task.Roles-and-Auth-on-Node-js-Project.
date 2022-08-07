const { Schema, model } = require("mongoose");
const roles = require("../auth/roles.list");

const User = new Schema({
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(roles)},
  subordinates: [{type: 'ObjectId', ref: "User"}],
});

module.exports = model("User", User);
