const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const db = require("../db/queries");

// Homepage.
exports.index = asyncHandler(async (req, res, next) => {
  const numCategories = await db.countCategories();
  const numItems = await db.countItems();
  console.log(numCategories);

  res.render("index", {
    title: "Zen Harmony Home",
    category_count: numCategories,
    item_count: numItems,
  });
});

//Display page for listing all items in a category.
exports.category_detail_get = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  if (categoryId) {
    const category = await db.getCategoryById(categoryId);
    const categoryItems = await db.getItemsByCategory(categoryId);

    res.render("category_detail", {
      title: "Category Detail",
      category: category,
      category_items: categoryItems,
    });
  } else {
    throw new Error("requeted category does not exist.");
  }
});

//Display page for listing all categories.
exports.category_list_get = asyncHandler(async (req, res) => {
  // db queries: getCategoryList
  const allCategories = await db.getCategoryList();

  res.render("category_list", {
    title: "Category List",
    category_list: allCategories,
  });
});

//Display page for creating new category on GET.
exports.category_create_get = asyncHandler(async (req, res) => {
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
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    //create Category object with escaped and trimmed data.
    const category = {
      name: req.body.name,
      description: req.body.description,
    };

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
      await db.insertCategory(category);
      // Redirect to new author record.
      res.redirect(`/inventory/category`);
    }
  }),
];

//Display page for deleting a category on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  //db query: getCategoryById, getItemsByCategory

  const category = await db.getCategoryById(req.params.id);
  const allCategoryItems = await db.getItemsByCategory(req.params.id);

  if (!allCategoryItems.length) {
    res.render("category_delete", {
      category: category,
      category_items: allCategoryItems,
    });
  } else {
    res.send("category has items and cannot be deleted");
  }
});

//Handle deleting a category on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  //Get category and all items.
  const category = await db.getCategoryById(req.params.id);
  const allCategoryItems = await db.getItemsByCategory(req.params.id);

  // check if category items exist, if so, treat the same as GET route.
  if (allCategoryItems.length > 0) {
    res.render("category_delete", {
      category: category,
      category_items: allCategoryItems,
    });
  }

  //delete category object in database.
  await db.deleteCategoryById(category.id);
  res.redirect("/inventory/category/");
});

// ------------------- TODO ... from here -------------------

//Display page for updating a category on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await db.getCategoryById(req.params.id);
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
    const category = {
      name: req.body.name,
      description: req.body.description,
      id: req.params.id,
    };

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

      const updatedCategory = await db.updateCategoryById(
        req.params.id,
        category
      );

      res.redirect(`/inventory/category${category.id}`);
    }
  }),
];
