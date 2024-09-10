const requiredFieldsMap: Map<any, Array<string | symbol>> = new Map();

export const required: PropertyDecorator = (target: Object, propertyKey: string | symbol): void => {
  const className = target.constructor.constructor.name;

  if (!requiredFieldsMap.has(className)) {
    requiredFieldsMap.set(className, []);
  }

  requiredFieldsMap.get(className)!.push(propertyKey);
};


