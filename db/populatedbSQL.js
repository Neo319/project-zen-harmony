// populate sql database

const { Client } = require("pg");

const categories = `
  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
  )
`;

const items = `
  CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    category_id INTEGER,
    price FLOAT,
    number_in_stock INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )
`;

const populateCategories = `
  INSERT INTO categories (name, description) VALUES 
  ('Fitness Equipment', 'Includes all equipment for staying active -- from yoga mats to dumbbells to active wear.'),
  ('Wellness Products', 'Our products tailored for promoting mental health and wellness.'),
  ('Supplements', 'Our dietary supplements for all dieting and weight loss efforts.'),
  ('Workout Plans', 'Includes all our specialized workout plans tailored to your individual fitness needs and goals.')
`;

const populateItems = `
  INSERT INTO items (name, description, category_id, price, number_in_stock) VALUES
  ('Standard Zen Yoga Mat', 'Our patented Zen Yoga Mat, designed to optimize flow during long sessions.', 1, 29.99, 21),
  ('Zen Dumbbell Set', 'Dumbbells set including 5, 10, and 15 lb variants, specialized for light cardio/aerobic sessions.', 1, 59.99, 4),
  ('Yoga Pants', 'Cozy pants designed to maximize your mobility and flexibility. Available in S to 2XL sizes.', 1, 39.99, 15),
  ('ZZZen Meditation Cushion', 'A cushion specialized for meditation -- but its unique softness means it doubles as a sleep pillow!', 2, 39.99, 9),
  ('Feng Shui Crystal', 'This gorgeous crystal is made with Feng Shui interior designers in mind -- providing an excellent centerpiece to any room that needs a balanced flow of Qi.', 2, 59.99, 20),
  ('Laughing Buddha Figure', 'Bringing a smile to any space, this cherublike, laughing Buddha is an important religious symbol for the Buddhas happiness and abundance.', 2, 49.99, 6),
  ('Multivitamin Supplement', 'Multivitamin contains important compounds: Thiamin, riboflavin, and niacin. B6, B12, and folate. Calcium, magnesium, selenium, and zinc', 3, 29.99, 29)
`;

// execution
async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_CONNECT_STRING,
  });

  try {
    await client.connect();
    console.log("Connected to the database");

    await client.query(categories);
    console.log("Categories table created");

    await client.query(items);
    console.log("Items table created");

    await client.query(populateCategories);
    console.log("Categories populated");

    await client.query(populateItems);
    console.log("Items populated");
  } catch (error) {
    console.error("Error executing queries:", error);
  } finally {
    await client.end();
    console.log("done");
  }
}

main();
