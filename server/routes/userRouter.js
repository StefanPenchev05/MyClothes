const express = require("express");
const router = express.Router();

//controllers
const userController = require("../controllers/userController");

//login user
router.post('/login', userController.login);
//router.post('/google-login', userController.googleLogin)
//register
router.post('/registration', userController.register);
//logout
router.post('/logout', userController.logout);
//sent reset password mail
router.post('/reset-password', userController.requestPasswordReset);
//reset password
router.get('/reset-password/:token', userController.resetPassword);
//get information of the selected user
router.get('/profile/:token', userController.getUsersData);

module.exports = router;
