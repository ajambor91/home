export interface TableCol {
  fieldName: string;
  colTitle: string;
  actionTemplate: ActionTemplate;
  action?:ActionTypes;
  actionName?: string;
}
export interface Action {
  action: ActionTypes;
  params: any;
}
export interface TableConfig extends Array<TableCol> {}
export type ActionTemplate = 'basic' | 'button';
export enum ActionTypes {
  EditPost = 'editPost',
  DeletePost = 'deletePost'
}

export const postsTable: TableConfig = [
  {
    fieldName: 'postId',
    colTitle: 'ID',
    actionTemplate: 'basic',
  },
  {
    fieldName: 'postTitle',
    colTitle: 'Tytuł',
    actionTemplate: 'basic'
  },
  {
    fieldName: 'category',
    colTitle: 'Kategoria',
    actionTemplate: 'basic'
  },
  {
    fieldName: '',
    colTitle: 'Edycja',
    actionTemplate: 'button',
    action: ActionTypes.EditPost,
    actionName: 'Edytuj'
  },
  {
    fieldName: '',
    colTitle: 'Usuwanie',
    actionTemplate: 'button',
    action: ActionTypes.DeletePost,
    actionName: 'Usuń'
  }
]
