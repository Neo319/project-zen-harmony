const pool = require("./pool");

//homepage: return count of all categories and items
async function countCategories() {
  const { rows } = await pool.query(`SELECT COUNT(*) FROM categories`);
  return rows[0].count;
}

async function countItems() {
  const { rows } = await pool.query(`SELECT SUM(number_in_stock) FROM items`);
  console.log(rows);
  return rows[0].sum;
}

module.exports = {
  countCategories,
  countItems,
};
