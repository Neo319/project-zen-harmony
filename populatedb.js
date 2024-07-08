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
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}
