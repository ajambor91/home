import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideStore} from "@ngrx/store";
import {postReducer} from "./store/posts.reducer";
import {provideEffects} from "@ngrx/effects";
import  * as loadPostsEffect from "./store/posts.effect";
import {PostsService} from "../../../adamantum-admin/src/app/services/posts.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore({
      posts: postReducer
    }),
    provideEffects([loadPostsEffect]),
    PostsService
  ]
};
