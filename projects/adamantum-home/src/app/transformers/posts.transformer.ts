import {TransformerAbstract} from "../core/transformer.abstract";
import {PostsTree} from "../../../../adamantum-shared-types";
import {ParsedPostTree} from "../models/posts-tree.model";
import {Processor} from "../core/processor";


// TODO: Remove providedIn from service and use provide in the component for more explicit dependency injection


export class PostsTransformer extends TransformerAbstract<PostsTree, ParsedPostTree> {
  constructor(protected override processor: Processor<PostsTree, ParsedPostTree>) {
    super(processor);
  }

}
