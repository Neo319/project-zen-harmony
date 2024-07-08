const express = require("express");
const router = express.Router();

//require controller modules
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/// CATEGORY routes ///

//GET request for creating a category
router.get("/category/create/", category_controller.category_create_get);

//POST request for creating a category

//GET request for listing all categories
router.get("/category", category_controller.index);

// ITEM routes

module.exports = router;
