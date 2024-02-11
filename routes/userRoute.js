const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/userController");
const {isLogin , isLogout} = require("../middleware/auth");

// router.get('/login',isLogout,UserController.getLogin);
// router.get('/signup',isLogout, UserController.getSignup);
router.post('/signup',UserController.postSignup);
router.post('/login',UserController.postLogin);
// router.get('/logout',isLogin,UserController.Logout);
// router.get('/dashboard',UserController.getDashboard);
module.exports = router;