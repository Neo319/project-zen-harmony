const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

//List all Categories.
exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category list GET");
});

//Display page for creating new category.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category create GET");
});
