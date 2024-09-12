import {ISupportInterface} from "../core/support.interface";
import {IFormatInterface} from "../core/formatter.interfaces";
import {PostsTree} from "../../../../adamantum-shared-types";
import {ParsedPostTree} from "../models/posts-tree.model";
import {PostsTreeClass} from "../classes/posts-tree.class";


export class PostsFormatter implements ISupportInterface<any>, IFormatInterface<PostsTree, ParsedPostTree[]> {

  public format(data: PostsTree): ParsedPostTree[] {

    const parsedPosts: ParsedPostTree[] = this.parsePosts(data)
    console.log(parsedPosts);
    return []
  }

  public support(item: any): boolean {
    Array.isArray(item) && item.findIndex(item => !(item instanceof PostsTreeClass))
    console.log(Array.isArray(item) && item.every(item => item instanceof PostsTreeClass))
    return Array.isArray(item) && item.every(item => item instanceof PostsTreeClass);
  }

  //TODO  add method definition
  private parsePosts(data: PostsTree): ParsedPostTree[] {

    return [];
  }

}
