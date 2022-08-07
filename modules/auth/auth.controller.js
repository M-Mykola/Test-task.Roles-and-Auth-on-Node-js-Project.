require("dotenv").config();
const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const roles = require("../auth/roles.list");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

class AuthController {
  async registration(req, res) {
    try {
      const { userName, password } = req.body;

      if (!body(req.body.userName).isEmpty()) {
        return res.status(401).json({ error: "Invalid name" });
      }
      const candidate = await User.findOne({ userName });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "User has already been registered" });
      }
      const hashPassword = bcrypt.hashSync(password, 8);
      const user = new User({
        userName: userName,
        password: hashPassword,
        role: roles.BOSS,
      });
      await user.save();
      return res.status(200).json({ message: "User has been registered." });
    } catch (error) {
      return res.status(400).json({ message: "Registatration error." });
    }
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ userName: req.body.userName });
      if (!user) {
        return res.status(404).send({ message: "Password not correct!" });
      }
      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!comparePassword) {
        return res.status(403).send({ message: "Password incorrect!" });
      }
      const secret = process.env.SECRET_KEY;
      const token = jwt.sign(
        { user_id: user._id, userName: user.userName, role: user.role },
        secret,
        {
          expiresIn: "1d",
        }
      );
      return res
        .status(200)
        .json({ message: `Welcome ${user.userName}`, user, token });
    } catch (error) {
      return res.status(400).json({ message: "Login error." });
    }
  }

  async verifyToken(req, res, next) {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "Token is required" });
    }
    try {
      const secret = process.env.SECRET_KEY;
      const decoded = jwt.verify(token, secret, roles);
      req.user = decoded;
    } catch (error) {
      return res.status(401).send({ message: "Invalid token" });
    }
    return next();
  }
}

module.exports = new AuthController();
