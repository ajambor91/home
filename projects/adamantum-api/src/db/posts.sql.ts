export const ADD_POST: string = "INSERT INTO posts (postTitle, postContent, fullPath, categoryId, createdAt) VALUES (?, ?, ?, ?, ?, ?)";
export const SELECT_ALL_POSTS: string = 'SELECT * FROM posts';
export const SELECT_POSTS: string = 'SELECT * FROM posts WHERE deletedAt IS NULL';
export const DELETE_POST: string = 'UPDATE posts SET deletedAt = ? WHERE postId = ?';
export const UPDATE_POST: string = 'UPDATE posts SET postTitle = ?, postContent = ? WHERE postId = ?';
export const SELECT_BLOG_POSTS: string = 'WITH RECURSIVE CategoryHierarchy AS (SELECT categoryId, categoryName, categoryParent FROM categories WHERE categoryParent IS NULL UNION ALL SELECT c.categoryId, c.categoryName, c.categoryParent FROM categories c INNER JOIN CategoryHierarchy ch ON c.categoryParent = ch.categoryId) SELECT ch.categoryId, ch.categoryName, p.postId, p.postTitle, p.postContent FROM CategoryHierarchy ch LEFT JOIN posts p ON p.categoryId = ch.categoryId WHERE p.deletedAt IS NULL;';
export const GET_POST_BY_ID: string = 'SELECT * FROM posts WHERE postId = ?';

export const GET_POSTS_LIST: string = 'SELECT p.postTitle, p.postId, c.categoryName FROM posts LEFT JOIN categories ON p.categoryId = c.categoryId;';
