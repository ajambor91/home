import {Routes} from "./core/router/types";
import {getPosts} from "./functions/posts/get-posts";
import {addPost} from "./functions/posts/add-post";
import {jsonify} from "./core/middleware/jsonify";
import {getPostsRoutes} from "./functions/posts/get-posts-routes";
import {loginUser} from "./functions/users/login-user";
import {addUser} from "./functions/users/add-user";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
    {
        pathname: '/api/posts',
        method: 'GET',
        function: getPosts
    },
    {
        pathname: '/api/routes',
        method: 'GET',
        function: getPostsRoutes
    },
    {
        pathname: '/api/post',
        method: 'POST',
        function: addPost,
        middleware: jsonify,
        guard: authGuard
    },
    {
        pathname: '/api/users/login',
        method: 'POST',
        function: loginUser,
        middleware: jsonify
    },
    {
        pathname: '/api/users/add',
        method: 'POST',
        function: addUser,
        middleware: jsonify
    }
]