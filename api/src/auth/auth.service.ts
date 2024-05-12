import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {ClienteService} from "../cliente/cliente.service";
import {Cliente} from "../cliente/entities/cliente.entity";
import {ClientePayload} from "./models/ClientePayload";
import {JwtService} from "@nestjs/jwt";
import {ClienteToken} from "./models/ClienteToken";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly clienteService: ClienteService,
    ) {
    }

    async validarCliente(email: string, password: string) {
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

    async login(cliente: Cliente): Promise<ClienteToken> {
        const payload = {
            sub: cliente.id,
            email: cliente.email,
            name: cliente.nome,
        };

        return {
            payload: { ...payload },
            access_token: this.jwtService.sign(payload)
        };
    }
}
