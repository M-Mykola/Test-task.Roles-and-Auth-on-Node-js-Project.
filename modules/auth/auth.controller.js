require("dotenv").config();
const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const roles = require("../auth/roles.list");
const jwt = require("jsonwebtoken");

class AuthController {
  async registration(req, res) {
    try {
      const { userName, password } = req.body;
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
        role: roles.USER,
      });
      await user.save();
      return res.status(200).json({ message: "User has been registered." });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registatration error." });
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
        { user_id: user._id, userName: req.body.userName },
        secret,
        {
          expiresIn: "1d",
        }
      );
      console.log(token);
      res
        .status(200)
        .json({ message: `Welcome ${user.userName}`, user, token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error." });
    }
  }
  async verifyToken(req, res, next) {
    const token =
      req.body.token || req.query.token || req.headers["access-token"];
    if (!token) {
      res.status(403).send({ message: "Token is required" });
    }
    try {
      const secret = process.env.SECRET_KEY;
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
    } catch (error) {
      res.status(401).send({ message: "Invalid token" });
    }
  }

}
module.exports = new AuthController();
