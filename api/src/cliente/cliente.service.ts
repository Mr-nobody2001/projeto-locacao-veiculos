import {BadRequestException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {CreateClienteDto} from './dto/create-cliente.dto';
import {UpdateClienteDto} from './dto/update-cliente.dto';
import {Cliente} from "./entities/cliente.entity";

@Injectable()
export class ClienteService {
    constructor(
        @Inject('CLIENTE_REPOSITORY')
        private clienteRepository: typeof Cliente
    ) {
    }

    async create(createClienteDto: CreateClienteDto) {
        createClienteDto.cpf = createClienteDto.cpf.replace(/\D/g, "");
        createClienteDto.telefone = createClienteDto.telefone.replace(/\D/g, "");

        const emailExiste = await this.emailExits(createClienteDto.email);
        if(emailExiste) {
            throw new BadRequestException("Esse email já está sendo usado");
        }

        const cpfExiste = await this.cpfExits(createClienteDto.cpf);
        if(cpfExiste) {
            throw new BadRequestException("Esse cpf já está sendo usado");
        }

        return await this.clienteRepository.create({
            nome: createClienteDto.nome,
            data_nascimento: createClienteDto.data_nascimento,
            cpf: createClienteDto.cpf,
            telefone: createClienteDto.telefone,
            email: createClienteDto.email,
            senha: createClienteDto.senha,
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

    async update(id: number, updateClienteDto: UpdateClienteDto) {
        let cliente = await this.findOne(id)

        const clienteAtualizado = {
            nome: updateClienteDto.nome || cliente.nome,
            data_nascimento: new Date(updateClienteDto.data_nascimento) || cliente.data_nascimento,
            cpf: updateClienteDto.cpf || cliente.cpf,
            telefone: updateClienteDto.telefone || cliente.telefone,
            email: updateClienteDto.email || cliente.email,
            senha: updateClienteDto.senha || cliente.senha,
            endereco: updateClienteDto.endereco || cliente.endereco,
            status: true,
        };

        await cliente.update(clienteAtualizado);
    }

    async remove(id: number) {
        const cliente = await this.findOne(id);

        await cliente.destroy();
    }

    async emailExits(email: string) {
        const count = await this.clienteRepository.count({
            where: {
                email,
            },
        });
        return count > 0;
    }

    async cpfExits(cpf: string) {
        const count = await this.clienteRepository.count({
            where: {
                cpf,
            },
        });
        return count > 0;
    }
}
