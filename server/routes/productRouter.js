const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// get random products from home page
router.get('/random', productController.getRandomProducts)
// add product
router.post('/add', productController.addProduct)

module.exports = router;