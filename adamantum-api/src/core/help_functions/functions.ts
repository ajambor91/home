import {HttpRequest, HttpResponse} from "../router/types";
import {Env} from "../../index";
import {BaseBody} from "../middleware/jsonify";

export const createResponse: (httpResponse: HttpResponse) => Response = (httpResponse: HttpResponse): Response => {
    return new Response(JSON.stringify(httpResponse.body), {
        headers: { "Content-Type": "application/json" },
        status: httpResponse.code
    })
}

export const createRouteBody: (body: any, env: Env) => HttpRequest<BaseBody> = (body: any,  env: Env) => {
    return {
        body: body,
        env: env
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

