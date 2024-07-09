const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

//List all Categories.
exports.index = asyncHandler(async (req, res, next) => {
  const [numCategories, numItems] = await Promise.all([
    Category.countDocuments({}).exec(),
    Item.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Zen Harmony Home",
    category_count: numCategories,
    item_count: numItems,
  });
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

//Display page for listing all items in a category.
exports.category_detail_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category detail GET");
});

//Display page for listing all categpries.
exports.category_list_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render("category_list", {
    title: "Category List",
    category_list: allCategories,
  });
});
