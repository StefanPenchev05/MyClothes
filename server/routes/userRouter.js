const express = require("express");
const router = express.Router();

// Import user controller
const userController = require("../controllers/userController");

// User authentication routes
router.post('/login', userController.login); // Login user
router.post('/registration', userController.register); // Register new user
router.post('/checkSession', userController.checkSession) // Checking Session
router.get('/logout', userController.logout); // Logout user

// Password reset routes
router.post('/reset-password', userController.requestPasswordReset); // Send password reset email
router.get('/reset-password/:token', userController.resetPassword); // Reset password

// User profile routes
router.get('/profile/:token', userController.getUsersData); // Get user data
router.get('/settings/general/', userController.getUserGeneralSettingsData); // Get user settings data
router.post('/settings/general/change/avatar', userController.changeAvatar); // Change user avatar

module.exports = router;