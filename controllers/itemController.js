const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

//Display item detail page on GET.
exports.item_detail_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  const category = await Category.findById(item.category);

  res.render("item_detail", {
    title: "Item detail",
    item: item,
    category: category,
  });
});

//Display page for creating new item on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item create GET");
});

//Handle creating a new item on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item create POST");
});

//Display page for deleting an item on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item delete GET");
});

//Handle deleting an item on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item delete POST");
});

//Display page for updating an item on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item update GET");
});

//Handle updating an item on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item update POST");
});
