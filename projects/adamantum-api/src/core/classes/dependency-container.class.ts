export class DependencyContainer {
  private static instance: DependencyContainer;
  private singletons: Map<string, any> = new Map<string, any>();
  private factories: Map<string, new (...args: any[]) => any> = new Map<string, new (...args: any[]) => any>();

  private constructor() {}

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  public registerSingleton<T>(key: string, instance: T): void {
    this.singletons.set(key, instance);
  }

  public registerFactory<T>(key: string, factory: new (...args: any[]) => T): void {
    this.factories.set(key, factory);
  }

  public resolve<T>(key: string, ...args: any[]): T {
    if (this.singletons.has(key)) {
      return this.singletons.get(key) as T;
    }

    const factory = this.factories.get(key);
    if (!factory) {
      throw new Error(`Dependency '${key}' not found`);
    }

    const instance = new factory(...args);
    this.singletons.set(key, instance);
    return instance as T;
  }
}
