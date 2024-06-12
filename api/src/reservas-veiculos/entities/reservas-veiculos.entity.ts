import { CreationOptional, NonAttribute } from "sequelize";
import {Column, Table, Model, AutoIncrement, PrimaryKey, BelongsTo} from "sequelize-typescript";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { InformacoesVeiculo } from "src/informacoes-veiculo/entities/informacoes-veiculo.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";

export enum ReservasVeiculosStatus {       
    reservado = 'Reservado',
    alugado = 'Alugado',
    finalizado = 'Finalizado',
    cancelado = 'Cancelado'
}

@Table
export class ReservasVeiculos extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ allowNull: false })
    declare id: number;
    
    @Column({ allowNull: false })
    informacoesVeiculoId: number;

    @Column({ allowNull: true })
    veiculoId: number;

    @Column({ allowNull: false })
    clienteId: number;

    @Column({ allowNull: false })
    checkInForecast: Date;

    @Column({ allowNull: false })
    checkOutForecast: Date;

    @Column({ allowNull: true })
    checkIn: Date;

    @Column({ allowNull: true })
    checkOut: Date;

    @Column({ allowNull: false })
    status: ReservasVeiculosStatus;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    @Column({ allowNull: true })
    canceledAt: Date;

    @BelongsTo(() => InformacoesVeiculo, 'informacoesVeiculoId')
    declare informacoesVeiculo?: NonAttribute<InformacoesVeiculo>;

    @BelongsTo(() => Veiculo, 'veiculoId')
    declare veiculo?: NonAttribute<Veiculo>;

    @BelongsTo(() => Cliente, 'clienteId')
    declare cliente?: NonAttribute<Cliente>;

}
