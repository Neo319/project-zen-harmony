#! /usr/bin/env node

// ------------------------- TODO: Refactor PopulateDB for SQL -------------------------

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

  console.log("added category: " + name + " index: " + index);
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
  console.log("added item: " + name + " category: " + category);
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
    //fitness gear category
    itemCreate(
      0,
      "Standard Zen Yoga Mat",
      "Our patented Zen Yoga Mat, designed to optimize flow during long sessions.",
      categories[0],
      29.99,
      21
    ),
    itemCreate(
      1,
      "Zen Dumbbell Set",
      "Dumbbells set including 5, 10, and 15 lb variants, specialized for light cardio/aerobic sessions.",
      categories[0],
      59.99,
      4
    ),
    itemCreate(
      2,
      "Yoga Pants",
      "Cozy pants designed to maximize your mobility and flexibility. Available in S to 2XL sizes.",
      categories[0],
      39.99,
      15
    ),

    // wellness products category
    itemCreate(
      3,
      "ZZZen Meditation Cushion",
      "A cushion specialized for meditation -- but its unique softness means it doubles as a sleep pillow!",
      categories[1],
      39.99,
      9
    ),
    itemCreate(
      4,
      "Feng Shui Crystal",
      "This gorgeous crystal is made with Feng Shui interior designers in mind -- providing an excellent centerpiece to any room that needs a balanced flow of Qi.",
      categories[1],
      59.99,
      20
    ),
    itemCreate(
      5,
      "Laughing Buddha Figure",
      "Bringing a smile to any space, this cherublike, laughing Buddha is an important religious symbol for the Buddha's happiness and abundance.",
      categories[1],
      49.99,
      6
    ),

    //supplements category
    itemCreate(
      6,
      "Multivitamin Supplement",
      "Multivitamin contains important compounds: Thiamin, riboflavin, and niacin. B6, B12, and folate. Calcium, magnesium, selenium, and zinc",
      categories[2],
      29.99,
      29
    ),
    itemCreate(
      7,
      "Mineral Supplements Set",
      "Supplements that include important minerals including iron, zinc, calcium, and magnesium",
      categories[2],
      34.99,
      10
    ),
    itemCreate(
      8,
      "Herbal/Botanical Supplements Set",
      "Herbal dietary supplements that incldude healthy echinachea and ginger",
      categories[2],
      20.99,
      21
    ),

    //workout plans category
    itemCreate(
      9,
      "10-day Yogic group retreat",
      "Join our professional Yoga instructors for a group retreat in the Himalayas this summer!",
      categories[3],
      189.99,
      3
    ),
    itemCreate(
      10,
      "30-day Pilates challenge",
      "Take the challenge of toning muscles in your full body, following a detailed online guide provided by our professional Pilataes instructors.",
      categories[3],
      89.99,
      100
    ),
    itemCreate(
      11,
      "30-day cardio goal",
      "Increase your cardiovascular health by taking the challenge of our 30-day incrementing cardio exercises! Great for beginners and experienced athletes alike.",
      categories[3],
      8.99,
      100
    ),
  ]);
}
