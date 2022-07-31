const Router  = require("express");
const userConrtoller = require("../user/user.controller");
const {verifyToken} = require("../auth/auth.controller");

const router = new Router();

router.get('getUser', verifyToken, userConrtoller.getUser);

module.exports = router;
