import {Routes} from "./core/router/types";
import {getPosts} from "./functions/posts/get-posts";
import {addPost} from "./functions/posts/add-post";
import {jsonify} from "./core/middleware/jsonify";
import {loginUser} from "./functions/users/login-user";
import {addUser} from "./functions/users/add-user";
import {authGuard} from "./core/guards/auth.guard";
import {getPostsTree} from "./functions/posts/get-posts-tree";
import {addCategory} from "./functions/categories/add-category";
import {getCategories} from "./functions/categories/get-categories";
import {getCategoriesTree} from "./functions/categories/get-categories-tree";
import {deletePost} from "./functions/posts/delete-post";
import {editPost} from "./functions/posts/edit-post";
import {getPost} from "./functions/posts/get-post";

export const routes: Routes = [
  {
    pathname: '/api/posts',
    method: 'GET',
    function: getPosts
  },
  {
    pathname: '/api/posts/:id',
    method: 'GET',
    function: getPost
  },
  {
    pathname: '/api/posts',
    method: 'POST',
    function: addPost,
    middleware: jsonify,
    guard: authGuard
  },
  {
    pathname: '/api/posts/:id',
    method: 'DELETE',
    function: deletePost
  },
  {
    pathname: '/api/posts/:id',
    method: 'PATCH',
    function: editPost,
    middleware: jsonify,
  },
  {
    pathname: '/api/posts-tree',
    method: 'GET',
    function: getPostsTree,
    middleware: jsonify
  },
  {
    pathname: '/api/users/login',
    method: 'POST',
    function: loginUser,
    middleware: jsonify
  },
  {
    pathname: '/api/users',
    method: 'POST',
    function: addUser,
    middleware: jsonify
  },
  {
    pathname: '/api/categories',
    method: 'POST',
    function: addCategory,
    middleware: jsonify,
    guard: authGuard
  },
  {
    pathname: '/api/categories',
    method: 'GET',
    function: getCategories
  },
  {
    pathname: '/api/categories-tree',
    method: 'GET',
    function: getCategoriesTree
  }
];
