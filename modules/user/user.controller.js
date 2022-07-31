const User = require("../user/user.model");

const UserController = {
  async getUser(req, res) {
    try {
      const user = await User.find();
      res.status(200).send(user);
    } catch (error) {
        console.log(error);
    }
  },
};

module.exports = UserController;