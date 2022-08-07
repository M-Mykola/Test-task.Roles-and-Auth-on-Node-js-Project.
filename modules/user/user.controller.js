require("dotenv").config();
const User = require("../user/user.model");
const roles = require("../auth/roles.list");
const jwt = require("jsonwebtoken");

const UserController = {
  async getUserList(req, res) {
    try {
      const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
      if (!token) {
        return res.status(403).send({ message: "Token is required" });
      }
      const secret = process.env.SECRET_KEY;
      const decoded = jwt.verify(token, secret, roles);
      req.user = decoded;

      if (req.user.role === "ADMIN") {
        const allUsers = await User.find();
        return res.status(200).send(allUsers);

      } else if (req.user.role === "BOSS") {
        const users = await User.find({ role: "USER" });
        return res.status(200).send(users);

      } else if (req.user.role === "USER") {
        const candidate = await User.findOne(req.user);
        return res.status(200).send(candidate);
      }

      return res
        .status(403)
        .send({ message: "You are not allowed to get users list." });
    } catch (error) {
      return res.status(502).send({ message: error });
    }
  },
};

module.exports = UserController;
