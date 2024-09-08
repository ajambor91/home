import {Routes} from "./core/router/types";
import {getPosts} from "./functions/posts/get-posts";
import {addPost} from "./functions/posts/add-post";
import {jsonify} from "./core/middleware/jsonify";
import {getPostsRoutes} from "./functions/posts/get-posts-routes";
import {loginUser} from "./functions/users/login-user";
import {addUser} from "./functions/users/add-user";

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
        pathname: '/api/posts',
        method: 'POST',
        function: addPost,
        middleware: jsonify
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