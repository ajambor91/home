export const GET_USER_BY_LOGIN: string = "SELECT * FROM users WHERE login = ?;";
export const INSERT_USER: string = "INSERT INTO users (userName, userLogin, userPassword, createdAt) VALUES (?,?,?, ?);";

export const GET_ALL_USERS: string = "SELECT * FROM users;";
export const GET_USER_BY_ID: string = "SELECT * FROM users WHERE userId = ?;";

export const UPDATE_USER_BY_ID: string = "UPDATE users SET userLogin, userName WHERE userId = ?;";
export const DELETE_USER: string = "UPDATE users SET deletedAt WHERE userId = ?;";

