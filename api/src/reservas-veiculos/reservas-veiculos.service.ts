import {Inject, Injectable, BadRequestException} from '@nestjs/common';
import { ReservasVeiculos, ReservasVeiculosStatus } from './entities/reservas-veiculos.entity';
import { CreateReservasVeiculosDto } from './dto/create-reservas-veiculos.dto';
import { ReservaCheckInDto } from './dto/reserva-check-in.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { InformacoesVeiculo } from 'src/informacoes-veiculo/entities/informacoes-veiculo.entity';
import { Veiculo, VeiculoDisponibilidade } from 'src/veiculo/entities/veiculo.entity';

@Injectable()
export class ReservasVeiculosService {
    constructor(
        @Inject('RESERVAS_VEICULOS_REPOSITORY')
        private reservasVeiculosRepository: typeof ReservasVeiculos,
        @Inject('CLIENTE_REPOSITORY')
        private clienteRepository: typeof Cliente,
        @Inject('INFORMACOES_VEICULO_REPOSITORY')
        private informacoesVeiculoRepository: typeof InformacoesVeiculo,
        @Inject('VEICULO_REPOSITORY')
        private veiculoRepository: typeof Veiculo,
    ) {
    }

    async create(createReservasVeiculosDto: CreateReservasVeiculosDto) {
        const cliente = await this.clienteRepository.findByPk(createReservasVeiculosDto.clienteId);

        if(!cliente) {
            throw new BadRequestException("Cliente não existe");
        }

        const infoVeiculo = await this.informacoesVeiculoRepository.findByPk(createReservasVeiculosDto.informacoesVeiculoId);
        
        if(!infoVeiculo) {
            throw new BadRequestException("Informação veiculo não existe");
        }

        return await this.reservasVeiculosRepository.create({
            informacoesVeiculoId: createReservasVeiculosDto.informacoesVeiculoId,
            clienteId: createReservasVeiculosDto.clienteId,
            checkInForecast: createReservasVeiculosDto.checkInForecast,
            checkOutForecast: createReservasVeiculosDto.checkOutForecast,
            status: ReservasVeiculosStatus.reservado
        });
    }

    findAll() {
        return this.reservasVeiculosRepository.findAll();
    }

    findOne(id: number) {
        return this.reservasVeiculosRepository.findByPk(id);
    }

    async checkIn(id: number, reservaCheckInDto: ReservaCheckInDto) {
        const reserva = await this.reservasVeiculosRepository.findByPk(id);

        if(!reserva) {
            throw new BadRequestException("Reserva não existe");
        }

        if(reserva.status !== ReservasVeiculosStatus.reservado) {
            throw new BadRequestException("Checkin ja realizado para essa reserva");
        }

        const veiculo = await this.veiculoRepository.findByPk(reservaCheckInDto.veiculoId);

        if(!veiculo) {
            throw new BadRequestException("Veiculo não existe");
        }

        if(veiculo.disponibilidade !== VeiculoDisponibilidade.disponivel) {
            throw new BadRequestException("Veiculo não disponivel");
        }

        await this.reservasVeiculosRepository.update({
            veiculoId: reservaCheckInDto.veiculoId,
            checkIn: new Date(),
            status: ReservasVeiculosStatus.alugado,
        }, { where: { id: reserva.id } });

        await this.veiculoRepository.update({
            disponibilidade: VeiculoDisponibilidade.indisponivel
        }, { where: { id: veiculo.id } });

        return await this.findOne(reserva.id);
    }

    async checkOut(id: number) {
        const reserva = await this.reservasVeiculosRepository.findByPk(id);

        if(!reserva) {
            throw new BadRequestException("Reserva não existe");
        }

        if(reserva.status !== ReservasVeiculosStatus.alugado) {
            throw new BadRequestException("Checkin não realizado para essa reserva");
        }

        await this.reservasVeiculosRepository.update({
            checkOut: new Date(),
            status: ReservasVeiculosStatus.finalizado,
        }, { where: { id: reserva.id } });

        await this.veiculoRepository.update({
            disponibilidade: VeiculoDisponibilidade.disponivel
        }, { where: { id: reserva.veiculoId } });

        return await this.findOne(reserva.id);

    }

    async cancelar(id: number) {
        const reserva = await this.reservasVeiculosRepository.findByPk(id);

        if(!reserva) {
            throw new BadRequestException("Reserva não existe");
        }

        if(reserva.status !== ReservasVeiculosStatus.reservado) {
            throw new BadRequestException("Reserva não pode ser cancelada");
        }

        await this.reservasVeiculosRepository.update({
            canceledAt: new Date(),
            status: ReservasVeiculosStatus.cancelado,
        }, { where: { id: reserva.id } });

        return await this.findOne(reserva.id);
    }
}
