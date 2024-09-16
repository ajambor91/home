import {Route} from '@angular/router';
import {AboutMeComponent} from "./components/main-page/about-me/about-me.component";
import {BlogComponent} from "./components/main-page/blog/blog.component";
import {GenericPostComponent} from "./components/main-page/generic-post/generic-post.component";

export interface IRouteEx extends Route {
  routeName?: string

}

export interface IRoutesEx extends Array<IRouteEx> {

}

export const routes: IRoutesEx = [
  {path: 'about-me', component: AboutMeComponent, routeName: 'about-me'},
  {path: 'blog', component: BlogComponent, routeName: 'blog'},
  {path: 'article/:slug', component: GenericPostComponent},
  {path: 'article/:category/:slug', component: GenericPostComponent},
  {path: 'article/:category/:subcategory/:slug', component: GenericPostComponent},
  {path: 'article/:category/:subcategory/:subsubcategory/:slug', component: GenericPostComponent}

];
