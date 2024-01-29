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
router.get('/logout', userController.logout);
//sent reset password mail
router.post('/reset-password', userController.requestPasswordReset);
//reset password
router.get('/reset-password/:token', userController.resetPassword);
//get information of the selected user
router.get('/profile/:token', userController.getUsersData);
//get the user data for the user settings page
router.get('/settings/general/', userController.getUserGeneralSettingsData);
//change avatar
router.post('/settings/general/change/avatar', userController.changeAvatar);

module.exports = router;
