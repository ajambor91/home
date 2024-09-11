export interface BaseBody {
}

export const jsonify: <T extends BaseBody>(request: Request) => Promise<T> = async <T extends BaseBody>(request: Request): Promise<T> => {
  try {
    const body = await request.json();
    return body as T;
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};
