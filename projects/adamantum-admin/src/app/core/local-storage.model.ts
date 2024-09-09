export type LocalStorageModel = {
  [key in LocalStorageKey]: any;
};
export type LocalStorageKey = 'token' | 'user';
