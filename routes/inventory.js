const express = require("express");
const router = express.Router();

//require controller modules
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

/* GET home page. */
router.get("/", category_controller.index);

/// CATEGORY routes ///

//GET and POST request for creating a category.
router.get("/category/create/", category_controller.category_create_get);
router.post("/category/create/", category_controller.category_create_post);

//GET and POST request for deleting a category.
router.get("/category:id/delete", category_controller.category_delete_get);
router.post("/category:id/delete", category_controller.category_delete_post);

//GET and POST request to update a category.
router.get("/category:id/update", category_controller.category_update_get);
router.post("/category:id/update", category_controller.category_update_post);

//GET request for listing all categories.
router.get("/category/", category_controller.category_list_get);

//GET request for listing all items in a category.
router.get("/category:id/list", category_controller.category_detail_get);

//

/// ITEM routes ///

//GET and POST request for creating an item.
router.get("/item/create", item_controller.item_create_get);
router.post("/item/create", item_controller.item_create_post);

//GET and POST request to delete an item.
router.get("/item:id/delete", item_controller.item_delete_get);
router.post("/item:id/delete", item_controller.item_delete_post);

//GET and POST request to update an item.
router.get("/item:id/update", item_controller.item_update_get);
router.post("/item:id/update", item_controller.item_update_post);

//GET request for detail of individual item.
router.get("/item:id/detail", item_controller.index);

module.exports = router;
