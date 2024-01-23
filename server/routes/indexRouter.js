const express = require("express");
const router = express.Router();

//user router
const userRouter = require("./userRouter");
//home page router
const homeRouter = require("./homeRouter");
//navBar router
const navBarRouter = require("./navBarRouter");
//countries
const countriesRouter = require("./countryRouter");
//cities
const citiesRouter = require("./cityRouter");
//messages
const messagesRouter = require("./messageRouter");
//products
const productsRouter = require("./productRouter");

//user Routers
router.use("/user", userRouter);
//home router
router.use("/home", homeRouter)
//navBar Router
router.use("/navBar", navBarRouter)
//countries Router
router.use("/countries", countriesRouter);
//cities Router
router.use("/cities", citiesRouter);
//messages Router
router.use("/user/message", messagesRouter);
//products Router
router.use("/products", productsRouter);

module.exports = router