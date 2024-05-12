import {Column, Table, Model} from "sequelize-typescript";

@Table
export class InformacoesVeiculo extends Model {
    @Column({allowNull: false})
    foto: string;

    @Column({allowNull: false, unique: true})
    detalhesVeiculoAPI: string;

    @Column({allowNull: false})
    caracteristicas: string;
}
