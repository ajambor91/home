import {Routes} from "./core/router/types";
import {getPosts} from "./functions/posts/get-posts";
import {addPost} from "./functions/posts/add-post";
import {jsonify} from "./core/middleware/jsonify";
import {getPostsRoutes} from "./functions/posts/get-posts-routes";

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
    }
]