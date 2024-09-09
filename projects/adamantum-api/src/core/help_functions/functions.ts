import {HttpRequest, HttpResponse} from "../router/types";
import {Env} from "../../index";
import {BaseBody} from "../middleware/jsonify";

export const createResponse: (httpResponse: HttpResponse) => Response = (httpResponse: HttpResponse): Response => {
    return new Response(JSON.stringify(httpResponse.body), {
        headers: { "Content-Type": "application/json" },
        status: httpResponse.code
    })
}

export const createRouteBody: (body: any, env: Env, headers: Headers) => HttpRequest<BaseBody> = (body: any,  env: Env, headers: Headers) => {
    return {
        body: body,
        env: env,
        headers: headers
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
        { name: 'PBKDF2' },
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
        { name: 'HMAC', hash: 'SHA-256' },
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
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
    );

    const base64UrlToUint8Array = (str: string) => Uint8Array.from(atob(str.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
    const signatureArray = base64UrlToUint8Array(signature);
    const isValid = await crypto.subtle.verify('HMAC', key, signatureArray, encoder.encode(data));
    return isValid;
};
