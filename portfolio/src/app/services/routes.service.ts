import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {map, Observable, shareReplay} from "rxjs";
import {IRouteEx, IRoutesEx, ITreeNodeRoutes} from "../models/route.model";
import {IApiRoutes} from "../models/api.model";
import {GenericPostComponent} from "../components/main-page/generic-post/generic-post.component";
import {PostRoute, PostsRoutes} from "api-types";

@Injectable()
export class RoutesService {
  private _routes: Observable<IApiRoutes> = this.apiService.getRoutes().pipe(shareReplay())
  constructor(private router: Router, private apiService: ApiService) {
  }

  public getRoutes(): Observable<ITreeNodeRoutes> {
    return this._routes.pipe(map(this.mergeRoutes.bind(this)));
  }

  private mergeRoutes(apiRoutes: PostsRoutes): ITreeNodeRoutes {
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
          children: curr.external && curr.category ? [{ name: curr.routeName!, path: curr.path!, children: [] }] : []
        };

        const parentIndex = acc.children.findIndex(item => item.name === mainKey);
        acc.children[parentIndex].children.push(childRoute);

        return acc;
      },
      {
        name: 'root',
        path: '/root',
        children: [
          { name: 'home', path: '/home', children: [] },
          { name: 'blog', path: '/blog', children: [] }
        ]
      } as ITreeNodeRoutes
    );
  }
}
