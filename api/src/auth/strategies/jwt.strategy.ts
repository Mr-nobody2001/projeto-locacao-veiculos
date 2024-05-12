import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClienteFromJwt } from '../models/ClienteFromJwt';
import { ClientePayload } from '../models/ClientePayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: ClientePayload): Promise<ClienteFromJwt> {
        return {
            id: payload.sub,
            email: payload.email,
            name: payload.name,
        };
    }
}