CREATE TABLE IF NOT EXISTS posts (postId INTEGER PRIMARY KEY, postTitle TEXT, postContent TEXT, fullPath Text, category TEXT);

CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY, userName TEXT, userLogin TEXT, userPassword TEXT);