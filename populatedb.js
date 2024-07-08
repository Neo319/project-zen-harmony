#! /usr/bin/env node

console.log(
  "this script populates a database with some sample categories and items. The database should be passed as an argument when this command is run. Provide MongoDB URI as a string."
);

//Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Item = require("./models/item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("debug: about to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  // call functions to create data
  await createCategories();
  await createItems();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();

  //index gets manually set here for consistent results
  categories[index] = category;

  console.log("added category: " + name);
}

// note: must make the categories before making the items
async function itemCreate(index, name, description, category, price, in_stock) {
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    in_stock: in_stock,
  });
  await item.save();
  items[index] = item;
  console.log("added item: " + name);
}

async function createCategories() {
  console.log("adding categories");
  await Promise.all([
    categoryCreate(
      0,
      "Fitness Equipment",
      "Includes all equpment for staying active -- from yoga mats to dumbbells to active wear."
    ),
    categoryCreate(
      1,
      "Wellness Products",
      "Our products tailored for promoting mental health and wellness."
    ),
    categoryCreate(
      2,
      "Supplements",
      "Our dietary supplements for all dieting and weight loss efforts."
    ),
    categoryCreate(
      3,
      "Workout Plans",
      "Includes all our specialized workout plans tailored to your individual fitness needs and goals."
    ),
  ]);
}

async function createItems() {
  console.log("adding items");
  await Promise.all([
    itemCreate(
      0,
      "Standard Zen Yoga Mat",
      "Our patented Zen Yoga Mat, designed to optimize flow during long sessions.",
      categories[1],
      29.99,
      21
    ),
  ]);
}
