import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideStore} from "@ngrx/store";
import {postReducer} from "./store/posts.reducer";
import {provideEffects} from "@ngrx/effects";
import * as loadPostsEffect from "./store/posts.effect";
import {PostsService} from "./services/posts.service";
import {PostsTransformer} from "./transformers/posts.transformer";
import {Processor} from "./core/processor";
import {PostsTree} from "../../../adamantum-shared-types";
import {ParsedPostTree} from "./models/posts-tree.model";
import {IFormatInterface} from "./core/formatter.interfaces";
import {FORMATTERS_TOKEN} from "./core/formatters.token";
import {PostsFormatter} from "./formatters/post-tree.formatter";

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
    PostsService,
    {
      provide: PostsTransformer,
      useFactory: (processor: Processor<PostsTree, ParsedPostTree>) => new PostsTransformer(processor),
      deps: [Processor<PostsTree, ParsedPostTree>]
    },
    {
      provide: Processor,
      useFactory: (formatters: Array<IFormatInterface<PostsTree, ParsedPostTree>>) => new Processor(formatters),
      deps: [FORMATTERS_TOKEN]
    },
    {
      provide: FORMATTERS_TOKEN,
      useFactory: () => [new PostsFormatter()],
    }
  ]
};
