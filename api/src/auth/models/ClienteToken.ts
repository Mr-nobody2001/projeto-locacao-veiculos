import {ClientePayload} from "./ClientePayload";

export interface ClienteToken {
    payload: ClientePayload;
    access_token: string;
}