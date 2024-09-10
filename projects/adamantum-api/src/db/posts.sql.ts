export const ADD_POST: string = "INSERT INTO posts (postTitle, postContent, fullPath, categoryId, createdAt) VALUES (?, ?,?, ?, ?)";
export const SELECT_ALL_POSTS: string = 'SELECT * FROM posts';
export const SELECT_POSTS: string = 'SELECT * FROM posts WHERE deletedAt IS NULL';
export const DELETE_POST: string = 'UPDATE posts SET deletedAt = ? WHERE postId = ?';
export const UPDATE_POST: string = 'UPDATE posts SET postTitle = ?, postContent = ? WHERE postId = ?';
export const SELECT_BLOG_POSTS: string = 'WITH RECURSIVE CategoryHierarchy AS (SELECT categoryId, categoryName, categoryParent FROM categories WHERE categoryParent IS NULL UNION ALL SELECT c.categoryId, c.categoryName, c.categoryParent FROM categories c INNER JOIN CategoryHierarchy ch ON c.categoryParent = ch.categoryId) SELECT ch.categoryId, ch.categoryName, p.postId, p.postTitle, p.postContent FROM CategoryHierarchy ch LEFT JOIN posts p ON p.categoryId = ch.categoryId WHERE p.deletedAt IS NULL;';
export const GET_POST_BY_ID: string = 'SELECT * FROM posts WHERE postId = ?';

export const GET_POSTS_LIST: string = 'WITH RECURSIVE category_hierarchy AS (SELECT c1.categoryId, c1.categoryName, c1.categoryParent FROM categories c1 WHERE c1.categoryParent IS NULL UNION ALL SELECT c2.categoryId, c2.categoryName, c2.categoryParent FROM categories c2 INNER JOIN category_hierarchy ch ON ch.categoryId = c2.categoryParent) SELECT p.postTitle, p.postId, p.fullPath, c.categoryName, ch.categoryName AS parentCategoryName FROM posts p LEFT JOIN categories c ON p.categoryId = c.categoryId LEFT JOIN category_hierarchy ch ON c.categoryParent = ch.categoryId;';


//DEBUG
// export const GET_POSTS_LIST: string = 'SELECT p.postTitle, p.postId, p.fullPath, c.categoryName FROM posts p LEFT JOIN categories c ON p.categoryId = c.categoryId;'
