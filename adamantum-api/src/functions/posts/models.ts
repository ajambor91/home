import {BaseBody} from "../../core/middleware/jsonify";

export interface NewPostPayload extends BaseBody{
    postTitle: string;
    postContent: string;
}