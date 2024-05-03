import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {ClienteService} from "../cliente/cliente.service";
import {Cliente} from "../cliente/entities/cliente.entity";
import {UserPayload} from "./models/UserPayload";
import {JwtService} from "@nestjs/jwt";
import {UserToken} from "./models/UserToken";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly clienteService: ClienteService,
    ) {
    }

    async validateUser(email: string, password: string) {
        const cliente = await this.clienteService.findByEmail(email);

        if (cliente) {
            const isPasswordValid = await bcrypt.compare(password, cliente.senha);

            if (isPasswordValid) {
                return {
                    ...cliente,
                    senha: undefined,
                };
            }
        }

        throw new UnauthorizedException('O endereço de e-mail ou senha fornecidos está incorreto.');
    }

    async login(user: Cliente): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.nome,
        };

        return {access_token: this.jwtService.sign(payload)};
    }
}
