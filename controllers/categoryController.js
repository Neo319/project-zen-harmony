const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

//List all Categories.
exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category list GET");
});

//Display page for creating new category on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category create GET");
});

//Handle creating a new category on POST.
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category create POST");
});

//Display page for deleting a category on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category delete GET");
});

//Handle deleting a category on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category delete POST");
});

//Display page for updating a category on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update GET");
});

//Handle updating a category on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update POST");
});

//Display page for listing all category items.
exports.category_list_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category list GET");
});
