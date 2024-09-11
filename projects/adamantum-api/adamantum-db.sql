CREATE TABLE IF NOT EXISTS posts
(
  postId      INTEGER PRIMARY KEY AUTOINCREMENT,
  postTitle   TEXT,
  postContent TEXT,
  fullPath    TEXT,
  categoryId  INTEGER,
  createdAt   INTEGER NOT NULL,
  deletedAt   INTEGER,
  FOREIGN KEY (categoryId) REFERENCES categories (categoryId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users
(
  userId       INTEGER PRIMARY KEY AUTOINCREMENT,
  userName     TEXT        NOT NULL,
  userLogin    TEXT UNIQUE NOT NULL,
  userPassword TEXT        NOT NULL,
  createdAt    INTEGER     NOT NULL,
  deletedAt    TEXT
);

CREATE TABLE IF NOT EXISTS categories
(
  categoryId     INTEGER PRIMARY KEY AUTOINCREMENT,
  categoryName   TEXT UNIQUE NOT NULL,
  categoryParent INTEGER,
  createdAt      TEXT        NOT NULL,
  deletedAt      TEXT,
  FOREIGN KEY (categoryParent) REFERENCES categories (categoryId) ON DELETE CASCADE

);
