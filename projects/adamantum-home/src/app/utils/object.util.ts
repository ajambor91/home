function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepCopy(item)) as any;
  }

  if (obj instanceof Set) {
    return new Set(Array.from(obj).map(item => deepCopy(item))) as any;
  }

  if (obj instanceof Map) {
    return new Map(Array.from(obj.entries()).map(([key, value]) => [deepCopy(key), deepCopy(value)])) as any;
  }

  const copy = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
}


export const ObjectUtil: {
  deepCopy: <T>(obj: T) => T
} = {
  deepCopy: deepCopy
}
