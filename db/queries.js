const pool = require("./pool");

//homepage: return count of all categories and items
async function countCategories() {
  const { rows } = await pool.query(`SELECT COUNT(*) FROM categories`);
  return rows[0].count;
}

async function countItems() {
  const { rows } = await pool.query(`SELECT SUM(number_in_stock) FROM items`);
  return rows[0].sum;
}

async function getCategoryById(categoryId) {
  const { rows } = await pool.query(
    `SELECT name FROM categories WHERE id = $1`,
    [categoryId]
  );
  return rows[0];
}

async function getItemsByCategory(categoryId) {
  const { rows } = await pool.query(
    `SELECT * FROM items WHERE category_id = $1`,
    [categoryId]
  );
  return rows;
}

async function getCategoryList() {
  const { rows } = await pool.query(`SELECT * FROM categories`);
  return rows;
}

async function insertCategory(category) {
  try {
    await pool.query(
      `INSERT INTO categories (name, description) VALUES ($1, $2)`,
      [category.name, category.description]
    );
  } catch (error) {
    console.error("error inserting category", error);
    throw error;
  }
}

module.exports = {
  countCategories,
  countItems,
  getCategoryById,
  getItemsByCategory,
  getCategoryList,
  insertCategory,
};
