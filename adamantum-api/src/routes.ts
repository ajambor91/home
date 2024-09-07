import {Routes} from "./core/router/types";
import {getPosts} from "./functions/posts/get-posts";
import {addPost} from "./functions/posts/add-post";
import {jsonify} from "./core/middleware/jsonify";

export const routes: Routes = [
    {
        pathname: '/api/posts',
        method: 'GET',
        function: getPosts
    },
    {
        pathname: '/api/posts',
        method: 'POST',
        function: addPost,
        middleware: jsonify
    }
]