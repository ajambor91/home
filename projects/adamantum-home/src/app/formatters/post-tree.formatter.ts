import {ISupportInterface} from "../core/support.interface";
import {IFormatInterface} from "../core/formatter.interfaces";
import {PostsTree, PostTree} from "../../../../adamantum-shared-types";
import {ParsedPostTree} from "../models/posts-tree.model";
import {PostsTreeClass} from "../classes/posts-tree.class";


export class PostsFormatter implements ISupportInterface<any>, IFormatInterface<PostsTree, ParsedPostTree[]> {

  public format(data: PostsTree): ParsedPostTree[] {

    const parsedPosts: ParsedPostTree[] = this.parsePosts(data)
    console.log('parser post tree result',parsedPosts);
    return []
  }

  public support(item: any): boolean {
    Array.isArray(item) && item.findIndex(item => !(item instanceof PostsTreeClass))
    console.log(Array.isArray(item) && item.every(item => item instanceof PostsTreeClass))
    return Array.isArray(item) && item.every(item => item instanceof PostsTreeClass);
  }

  //TODO  add method definition
  private parsePosts(data: PostsTree): ParsedPostTree[] {
    const arr: ParsedPostTree[] = [];
    for (let i: number = 0; i < data.length; i++) {
        const newItem: ParsedPostTree = {...data[i], children: []};
      if (!newItem.categoryName) {
          arr.push(newItem)
         } else {
        const post: ParsedPostTree | undefined = arr.find(post => post.categoryName === newItem.categoryName)

        if (post) {

          post.children?.push(newItem);
        } else {
          const itemWithNoChildren = Object.assign({}, newItem);
          itemWithNoChildren.children = [];
          newItem.children?.push(itemWithNoChildren)
          arr.push(newItem);

        }
      }
    }
    // for (let i: number = 0; i < data.length; i++) {
    //   const item: ParsedPostTree = data[i];
    //   if (!item.categoryName) {
    //     categories['none'].push(item)
    //   } else {
    //     if (item.categoryName in categories) {
    //       categories[item.categoryName].push(item);
    //     } else {
    //       categories[item.categoryName] = [];
    //       categories[item.categoryName].push(item)
    //     }
    //
    //   }
    // }
    //
    // for (let [key, value] of Object.entries(categories)) {
    //   arr.push()
    // }
    console.log('categories',arr)
    return arr;
  }

}

// data.reduce((acc, curr) => {
//   const postCategoryId: number | null = curr.categoryId;
//   if (!!postCategoryId) {
//     acc.p
//   }
//   if (!!postCategoryId &&  )
//     return acc;
// }, [] as ParsedPostTree)
