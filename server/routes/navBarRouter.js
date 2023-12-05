const express = require("express");
const router = express.Router();

const navBarController = require('../controllers/navBarController')

router.get("/userInfo", navBarController.sendUserData);

//get the useres for search bar
router.get('/searchBar/:username', navBarController.sendSearchData);

module.exports = router;