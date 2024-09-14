import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {map, Observable, shareReplay, take} from "rxjs";
import {IRouteEx, IRoutesEx, ITreeNodeRoutes} from "../models/route.model";
import {IApiRoutes} from "../models/api.model";
import {GenericPostComponent} from "../components/main-page/generic-post/generic-post.component";
import {PostRoute, Posts, PostsRoutes, PostsTree, PostTree} from "shared-types";
import {PostsTransformer} from "../transformers/posts.transformer";
import {Store} from "@ngrx/store";
import {selectAllPosts} from "../store/posts.selectors";
import {PostsApiService} from "../../../../adamantum-api-reqs/src/lib/posts/posts.api.service";
import {PostsTreeClass} from "../classes/posts-tree.class";
import {ParsedPostTree} from "../models/posts-tree.model";

@Injectable()
export class PostsService {
  // private _routes: Observable<IApiRoutes> = this.apiService.getRoutes().pipe(shareReplay())

  constructor(private router: Router, private transformer: PostsTransformer, private store: Store, private _postsApi: PostsApiService) {
  }


  public getPostsTree$(): Observable<PostsTree> {
    return this._postsApi.getPostsTree$().pipe(map(posts => posts.map<PostTree>(post => new PostsTreeClass(post.categoryId, post.categoryName, post.createdA, post.fullPath, post.parentCategoryName, post.postId, post.postTitle, post.categoryParentId))));
  }

  public getPosts(): Observable<ParsedPostTree[] | null> {
    return this.store.select(selectAllPosts).pipe(
      map(res => this.transformer.transform(res)),
    )
  }

  private mergeRoutes(apiRoutes: PostsRoutes): ITreeNodeRoutes {
    // @ts-ignore
    const externalRoutes: IRouteEx[] = apiRoutes.map((item: PostRoute) => ({
      path: item.fullPath,
      routeName: item.fullPath,
      external: true,
      component: GenericPostComponent,
      category: item.category
    }));

    return [...this.router.config as IRoutesEx, ...externalRoutes].reduce(
      (acc: ITreeNodeRoutes, curr: IRouteEx) => {
        const mainKey = curr.external ? 'blog' : 'home';
        const childRoute: ITreeNodeRoutes = {
          name: curr.category || curr.routeName || curr.path!,
          path: curr.category || curr.path!,
          children: curr.external && curr.category ? [{name: curr.routeName!, path: curr.path!, children: []}] : []
        };

        const parentIndex = acc.children.findIndex(item => item.name === mainKey);
        acc.children[parentIndex].children.push(childRoute);

        return acc;
      },
      {
        name: 'root',
        path: '/root',
        children: [
          {name: 'home', path: '/home', children: []},
          {name: 'blog', path: '/blog', children: []}
        ]
      } as ITreeNodeRoutes
    );
  }
}
