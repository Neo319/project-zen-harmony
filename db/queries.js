const pool = require("./pool");

// ------------------------ CATEGORIES QUERIES ------------------------
async function countCategories() {
  const { rows } = await pool.query(`SELECT COUNT(*) FROM categories`);
  return rows[0].count;
}

async function countItems() {
  const { rows } = await pool.query(`SELECT SUM(number_in_stock) FROM items`);
  return rows[0].sum;
}

async function getCategoryById(categoryId) {
  const { rows } = await pool.query(`SELECT * FROM categories WHERE id = $1`, [
    categoryId,
  ]);
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

async function deleteCategoryById(categoryId) {
  try {
    await pool.query(`DELETE FROM categories WHERE id = $1`, [categoryId]);
  } catch (error) {
    console.error("error deleting category", error);
    throw error;
  }
}

async function updateCategoryById(categoryId, newCategory) {
  try {
    await pool.query(
      `UPDATE categories SET name = $2, description = $3 WHERE id = $1`,
      [categoryId, newCategory.name, newCategory.description]
    );
  } catch (error) {
    console.error("error updating category", error);
    throw error;
  }
}

async function getAllCategories() {
  const { rows } = await pool.query(`SELECT * FROM categories`);
  return rows;
}

// ------------------------ ITEM QUERIES ------------------------

async function getItemById(itemId) {
  try {
    const { rows } = await pool.query(`SELECT * FROM items WHERE id = $1`, [
      itemId,
    ]);
    return rows[0];
  } catch (error) {
    console.error("error finding item", error);
    throw error;
  }
}

async function getCategoryByItemId(itemId) {
  try {
    // Step 1: Retrieve the category_id from the items table
    const itemResult = await pool.query(
      "SELECT category_id FROM items WHERE id = $1",
      [itemId]
    );

    if (itemResult.rows.length === 0) {
      throw new Error("Item not found");
    }

    const categoryId = itemResult.rows[0].category_id;

    // Step 2: Retrieve the category details from the categories table
    const categoryResult = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [categoryId]
    );

    if (categoryResult.rows.length === 0) {
      throw new Error("Category not found");
    }

    return categoryResult.rows[0];
  } catch (error) {
    console.error("Error finding category by item id", error);
    throw error;
  }
}

async function insertItem(item) {
  try {
    const result = await pool.query(
      `INSERT INTO items (name, description, category_id, price, number_in_stock) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [item.name, item.description, item.category, item.price, item.in_stock]
    );

    return result.rows[0].id; //for redirecting user
  } catch (error) {
    console.error("error inserting category", error);
    throw error;
  }
}

async function deleteItemById(itemId) {
  try {
    await pool.query(`DELETE FROM items where id = $1`, [itemId]);
  } catch (error) {
    console.error("error deleting item", error);
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
  deleteCategoryById,
  updateCategoryById,
  getAllCategories,

  getItemById,
  getCategoryByItemId,
  insertItem,
  deleteItemById,
};
