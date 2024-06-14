import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {CreateClienteDto} from './dto/create-cliente.dto';
import {UpdateClienteDto} from './dto/update-cliente.dto';
import {Cliente} from './entities/cliente.entity';
import * as bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

@Injectable()
export class ClienteService {
    constructor(
        @Inject('CLIENTE_REPOSITORY')
        private clienteRepository: typeof Cliente,
    ) {
    }

    async create(createClienteDto: CreateClienteDto) {
        createClienteDto.cpf = createClienteDto.cpf.replace(/\D/g, '');
        createClienteDto.telefone = createClienteDto.telefone.replace(/\D/g, '');

        const emailExiste = await this.emailExits(createClienteDto.email);
        if (emailExiste) {
            throw new BadRequestException('Esse email já está sendo usado');
        }

        const cpfExiste = await this.cpfExits(createClienteDto.cpf);
        if (cpfExiste) {
            throw new BadRequestException('Esse cpf já está sendo usado');
        }

        const senha = await this.encriptarSenha(createClienteDto.senha);

        return await this.clienteRepository.create({
            nome: createClienteDto.nome,
            data_nascimento: createClienteDto.data_nascimento,
            cpf: createClienteDto.cpf,
            telefone: createClienteDto.telefone,
            email: createClienteDto.email,
            senha: senha,
            endereco: createClienteDto.endereco,
            status: true,
        });
    }

    findAll() {
        return this.clienteRepository.findAll();
    }

    async findOne(id: number) {
        const cliente = await this.clienteRepository.findByPk(id);

        if (!cliente) {
            throw new NotFoundException('Cliente não encontrado');
        }

        return cliente;
    }

    async findByEmail(email: string) {
        const cliente = await this.clienteRepository.findOne({where: {email: email}});

        if (!cliente) {
            throw new NotFoundException('Cliente não encontrado');
        }

        return cliente;
    }

    async update(id: number, updateClienteDto: UpdateClienteDto) {
        updateClienteDto.cpf = updateClienteDto.cpf.replace(/\D/g, '');
        updateClienteDto.telefone = updateClienteDto.telefone.replace(/\D/g, '');

        let cliente = await this.findOne(id);
        if (!cliente) {
            throw new BadRequestException('Cliente não encontrado');
        }

        const emailExiste = await this.emailExits(updateClienteDto.email, cliente.id);
        if (emailExiste) {
            throw new BadRequestException('Esse email já está sendo usado');
        }

        const cpfExiste = await this.cpfExits(updateClienteDto.cpf, cliente.id);
        if (cpfExiste) {
            throw new BadRequestException('Esse cpf já está sendo usado');
        }

        const senha = updateClienteDto.senha ? await this.encriptarSenha(updateClienteDto.senha) : cliente.senha;

        const clienteAtualizado = {
            nome: updateClienteDto.nome || cliente.nome,
            data_nascimento:
                new Date(updateClienteDto.data_nascimento) || cliente.data_nascimento,
            cpf: updateClienteDto.cpf || cliente.cpf,
            telefone: updateClienteDto.telefone || cliente.telefone,
            email: updateClienteDto.email || cliente.email,
            senha: senha,
            endereco: updateClienteDto.endereco || cliente.endereco,
            status: true,
        };

        await cliente.update(clienteAtualizado);
    }

    async remove(id: number) {
        const cliente = await this.findOne(id);

        await cliente.destroy();
    }

    async emailExits(email: string, id?: number) {
        const where: any = {
            email,
        };
    
        if (id) {
            where.id = {
                [Op.ne]: id,
            };
        }
    
        const count = await this.clienteRepository.count({
            where,
        });
    
        return count > 0;
    }

    async cpfExits(cpf: string, id?: number) {
        const where: any = {
            cpf,
        };

        if (id) {
            where.id = {
                [Op.ne]: id,
            };
        }
        const count = await this.clienteRepository.count({
            where
        });

        return count > 0;
    }

    async encriptarSenha(senha: string) {
        return await bcrypt.hash(senha, 10);
    }
}
