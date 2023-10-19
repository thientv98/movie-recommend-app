import * as jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "secret"

export function signJwt(object: Object) {
    return jwt.sign(object, secretKey);
}

export function verifyJwt<T>(token: string): T | null {
    try {
        const decoded = jwt.verify(token, secretKey) as T;
        return decoded;
    } catch (e) {
        return null;
    }
}

export const getToken = (authorization: string) => {
    if (
        authorization &&
        authorization.split(" ")[0] === "Bearer"
    ) {
        return authorization.split(" ")[1];
    }
    return null;
}