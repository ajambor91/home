import {HttpRequest, HttpResponse} from "../router/types";
import {Env} from "../../index";
import {BaseBody} from "../middleware/jsonify";
import {RepoClass} from "../abstract/repo.abstract";
import {EntityClass} from "../abstract/entity.abstract";
import {DependencyContainer} from "../classes/dependency-container.class";

export const createResponse: (httpResponse: HttpResponse) => Response = (httpResponse: HttpResponse): Response => {
  return new Response(JSON.stringify(httpResponse.body), {
    headers: {"Content-Type": "application/json"},
    status: httpResponse.code
  })
}

export const createRouteBody: (body: any, env: Env, headers: Headers, params?: { [key: string]: string }, queries?: {
  [key: string]: string
}) => HttpRequest<BaseBody> = (body: any, env: Env, headers: Headers, params?: { [key: string]: string }, queries?: {
  [key: string]: string
}) => {
  return {
    body,
    env,
    headers,
    params,
    queries
  }
}

export const hashPassword: (password: string, salt: string) => Promise<string> = async (password, salt) => {
  const pepper = 'stały-pepper-aplikacji';  // np. zmienna środowiskowa
  const pepperedPassword = password + pepper;  // Dodanie peppera do hasła
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(pepperedPassword);
  const saltBuffer = encoder.encode(salt);

  const key = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    {name: 'PBKDF2'},
    false,
    ['deriveBits', 'deriveKey']
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 100000,
      hash: 'SHA-256',
    },
    key,
    256
  );

  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer))); // Base64
};

export const generateJWT: (payload: object, secret: string) => Promise<string> = async (payload, secret) => {
  const encoder = new TextEncoder();

  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const base64UrlHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const base64UrlPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const data = `${base64UrlHeader}.${base64UrlPayload}`;

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    {name: 'HMAC', hash: 'SHA-256'},
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));

  const base64UrlSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${data}.${base64UrlSignature}`;
};


export const verifyJWT: (token: string, secret: string) => Promise<boolean> = async (token, secret) => {
  const encoder = new TextEncoder();
  const [header, payload, signature] = token.split('.');

  if (!header || !payload || !signature) {
    return false;
  }
  const data = `${header}.${payload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    {name: 'HMAC', hash: 'SHA-256'},
    false,
    ['verify']
  );

  const base64UrlToUint8Array = (str: string) => Uint8Array.from(atob(str.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
  const signatureArray = base64UrlToUint8Array(signature);
  const isValid = await crypto.subtle.verify('HMAC', key, signatureArray, encoder.encode(data));
  return isValid;
};

export const getRepository = <T extends RepoClass>(cls: new (...args: any[]) => T, ...params: any[]): T => {
  const container: DependencyContainer = DependencyContainer.getInstance();
  return container.resolve<T>(cls.name, ...params);
};

export const getEntity = <T extends EntityClass>(cls: new (...args: any[]) => T, ...params: any[]): T => {
  const container: DependencyContainer = DependencyContainer.getInstance();
  return container.resolve<T>(cls.name, ...params);
};


export const getTimestamp: (date: Date | undefined) => number = (date: Date | undefined) => {
  return !!date ? Math.floor(date.getTime() / 1000) : Math.floor(new Date().getTime() / 1000)
}

export const getPropOrNull = <T extends object, K extends keyof T>(obj: T, prop: K): T[K] | null => {
  return Object.prototype.hasOwnProperty.call(obj, prop) ? obj[prop] : null;
};

export const getQueryParam = (queryParams: {[key: string]: string | undefined | null} | undefined, paramName: string) => {
  if (!queryParams) {
    return null;
  }
  const param: string | undefined | null = queryParams[paramName];
  if (param) {
    return param as number | string
  } else  {
    return null;
  }
}
