import {TransformerAbstract} from "../core/transformer.abstract";
import {PostsTree} from "../../../../adamantum-shared-types";
import {ParsedPostTree} from "../models/posts-tree.model";
import {Processor} from "../core/processor";


//TODO remove providedIn and add provide in component


export class PostsTransformer extends TransformerAbstract<PostsTree, ParsedPostTree> {
  constructor(protected override processor: Processor<PostsTree, ParsedPostTree>) {
    super(processor);
    console.log('child, proces', processor)
  }

}
