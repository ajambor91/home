export const ADD_CATEGORY: string = "INSERT INTO categories (categoryName, categoryParent, createdAt) VALUES (?, ?, ?)";
export const SELECT_ALL_CATEGORIES: string = 'SELECT * FROM categories WHERE deletedAt IS NULL';
export const DELETE_CATEGORY: string = 'UPDATE categories SET deletedAt = ? WHERE categoryId = ?';
export const UPDATE_CATEGORY: string = 'UPDATE categories SET postTitle = ?, categoryName = ? WHERE categoryId = ?';
export const GET_CATEGORY_BY_ID: string = 'SELECT * FROM categories WHERE categoryId = ?';
