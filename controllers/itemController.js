const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const db = require("../db/queries");

//Display item detail page on GET.
exports.item_detail_get = asyncHandler(async (req, res, next) => {
  //find item & category id
  const item = await db.getItemById(req.params.id);
  const category = await db.getCategoryByItemId(req.params.id);

  res.render("item_detail", {
    title: "Item detail",
    item: item,
    category: category,
  });
});

// ------------------- TODO ... from here -------------------

//Display page for creating new item on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await db.getAllCategories();

  res.render("item_form", {
    title: "Create Item",
    categories: allCategories,
  });
});

//Handle creating a new item on POST.
exports.item_create_post = [
  //Validate and sanitize data.
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be at least 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("price", "Price must be a number.")
    .trim()
    .isNumeric()
    .isLength({ min: 1 })
    .escape(),
  body("in_stock", "no. in stock must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .isNumeric()
    .escape(),
  //Ensure that some category is specified
  body("category", "category must be specified.").notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    //Extract any errors from request.
    const errors = validationResult(req);

    //create new Item object.
    const item = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      in_stock: req.body.in_stock,
      category: req.body.category,
    };

    if (!errors.isEmpty()) {
      //there are errors. Re-render the form with sanitized data.
      res.render("item_form", {
        title: "Create Item",
        item: item,
      });
    } else {
      //Data is valid: save to database and redirect.
      const newItemId = await db.insertItem(item);
      res.redirect(`/inventory/item${newItemId}`);
    }
  }),
];

//Display page for deleting an item on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  const category = await Category.findById(item.category);

  res.render("item_delete", {
    title: "Delete Item",
    item: item,
    category: category,
  });
});

//Handle deleting an item on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  //No checks needed.
  await Item.findByIdAndDelete(req.params.id);
  res.redirect(`/inventory/category${item.category}/`);
});

//Display page for updating an item on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, allCategories] = await Promise.all([
    Item.findById(req.params.id),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  const itemCategory = await Category.findById(item.category);

  res.render("item_form", {
    title: "Update Item",
    item: item,
    categories: allCategories,
    item_category: itemCategory,
  });
});

//Handle updating an item on POST.
exports.item_update_post = [
  //Validate and sanitize data.
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be at least 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("price", "Price must be a number.")
    .trim()
    .isNumeric()
    .isLength({ min: 1 })
    .escape(),
  body("in_stock", "no. in stock must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .isNumeric()
    .escape(),
  //Ensure that some category is specified
  body("category", "category must be specified.").notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    //Extract any errors from request.
    const errors = validationResult(req);

    //create new Item object.
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      in_stock: req.body.in_stock,
      category: req.body.category,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      //there are errors. Re-render the form with sanitized data.
      res.render("item_form", {
        title: "Update Item",
        item: item,
      });
    } else {
      //Data is valid: Update to database and redirect.
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect(`/inventory/item${updatedItem.id}/`);
    }
  }),
];
