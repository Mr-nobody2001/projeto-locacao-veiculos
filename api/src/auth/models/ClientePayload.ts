export interface ClientePayload {
    sub: number;
    email: string;
    name: string;
    iat?: number;
    exp?: number;
}