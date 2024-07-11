const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Homepage.
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

//Display page for listing all items in a category.
exports.category_detail_get = asyncHandler(async (req, res, next) => {
  const [category, allCategoryItems] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (category === null) {
    // No results.
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: "Category Detail",
    category: category,
    category_items: allCategoryItems,
  });
});

//Display page for listing all categpries.
exports.category_list_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render("category_list", {
    title: "Category List",
    category_list: allCategories,
  });
});

//Display page for creating new category on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
});

//Handle creating a new category on POST.
exports.category_create_post = [
  //Validate and sanitize data.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category name must be specified."),

  body("description")
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category description must be specified."),

  //process request after validation (asyncHandler here)
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    //create Category object with escaped and trimmed data.
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save category.
      await category.save();
      // Redirect to new author record.
      res.redirect(`/inventory/category${category.id}`);
    }
  }),
];

//Display page for deleting a category on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, allCategoryItems] = await Promise.all([
    Category.findById(req.params.id),
    Item.find({ category: req.params.id }),
  ]);

  res.render("category_delete", {
    category: category,
    category_items: allCategoryItems,
  });
});

//Handle deleting a category on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  //Get category and all items.
  const [category, allCategoryItems] = await Promise.all([
    Category.findById(req.params.id),
    Item.find({ category: req.params.id }),
  ]);

  // check if category items exist, if so, treat the same as GET route.
  if (allCategoryItems.length > 0) {
    res.render("category_delete", {
      category: category,
      category_items: allCategoryItems,
    });
  }

  //delete category object in database.
  await Category.findByIdAndDelete(req.params.id);
  res.redirect("/inventory/category/");
});

//Display page for updating a category on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  res.render("category_form", { title: "Update Category", category: category });
});

//Handle updating a category on POST.
exports.category_update_post = [
  //Validate and sanitize data.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category name must be specified."),

  body("description")
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category description must be specified."),

  //process request after validation (asyncHandler here)
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    //create Category object with escaped and trimmed data.
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Update category and redirect.
      updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        category,
        {}
      );
      res.redirect(`/inventory/category${updatedCategory.id}`);
    }
  }),
];
