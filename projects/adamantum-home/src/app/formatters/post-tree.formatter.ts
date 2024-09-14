import {ISupportInterface} from "../core/support.interface";
import {IFormatInterface} from "../core/formatter.interfaces";
import {PostsTree, PostTree} from "../../../../adamantum-shared-types";
import {ParsedPostTree} from "../models/posts-tree.model";
import {PostsTreeClass} from "../classes/posts-tree.class";
import {ObjectUtil} from "../utils/object.util";
import {it} from "node:test";


export class PostsFormatter implements ISupportInterface<any>, IFormatInterface<PostsTree, ParsedPostTree> {

  public format(data: PostsTree): ParsedPostTree[] {

    const parsedPosts: ParsedPostTree[] = this.parsePosts(data)
    console.log('result',parsedPosts)
    return parsedPosts;
  }

  public support(item: any): boolean {
    Array.isArray(item) && item.findIndex(item => !(item instanceof PostsTreeClass))
    return Array.isArray(item) && item.every(item => item instanceof PostsTreeClass);
  }

  private parsePosts(data: PostsTree): ParsedPostTree[] {
    const arr: ParsedPostTree[] = [];
    for (let i: number = 0; i < data.length; i++) {
        const item: ParsedPostTree = {...data[i], children: []};
        const itemWihoutChildren = ObjectUtil.deepCopy(item)
        itemWihoutChildren.children = [];
        const category: ParsedPostTree | undefined = arr.find(category => category.categoryName === item.categoryName)
        const category2: ParsedPostTree | undefined = arr.find(category2 => category2.categoryParentId === item.categoryId)
        if (!item.categoryName) {
          const itemWihoutChildren = ObjectUtil.deepCopy(item)
          itemWihoutChildren.children = [];
          arr.push(itemWihoutChildren)
        } else {
          if (category && !item.parentCategoryName) {
            const itemWihoutChildren = ObjectUtil.deepCopy(item)
            itemWihoutChildren.children = [];
            category.children?.push(itemWihoutChildren)
          } else if(category2 && !item.parentCategoryName) {
            const itemWihoutChildren = ObjectUtil.deepCopy(item)
            itemWihoutChildren.children = [];
            category2.children?.push(itemWihoutChildren);
          } else if(item.categoryParentId) {
            const categoryParent: ParsedPostTree | undefined = category?.children!.find(categoryParent => categoryParent.categoryParentId === item.categoryParentId)
            if (categoryParent) {
              const itemWihoutChildren = ObjectUtil.deepCopy(item)
              itemWihoutChildren.children = [];
              categoryParent.children?.push(itemWihoutChildren);
            } else {
              const post: ParsedPostTree = ObjectUtil.deepCopy(itemWihoutChildren)
              const postWithoutChildren = ObjectUtil.deepCopy(post)
              post.children?.push(postWithoutChildren)
              console.log('post', post)
              itemWihoutChildren.children.push(post)
              arr.push(itemWihoutChildren)
            }
          } else {
            const itemWihoutChildren = ObjectUtil.deepCopy(item)
            itemWihoutChildren.children = [];
            const post: ParsedPostTree = ObjectUtil.deepCopy(itemWihoutChildren);
            post.children?.push(itemWihoutChildren)
            arr.push(post)
          }
        }

    }
    return arr;
  }
}

