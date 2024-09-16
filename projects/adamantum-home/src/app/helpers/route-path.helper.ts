import {ParsedPostTree} from "../models/posts-tree.model";

export class RoutePathHelper {
  public static createPath(item: ParsedPostTree): string {
    if (!!item.categoryParentId) {
      return `/article/${item.parentCategoryName}/${item.categoryName}/${item.postTitle}`;
    } else if (!!item.categoryId) {
      return `/article/${item.categoryName}/${item.postTitle}`
    } else {
      return `/article/${item.postTitle}`
    }
  }
}
