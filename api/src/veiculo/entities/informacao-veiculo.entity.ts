import { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({tableName:'InformacoesVeiculo'})
export class InformacaoVeiculo extends Model<InferAttributes<InformacaoVeiculo>, InferCreationAttributes<InformacaoVeiculo>> {
    @PrimaryKey
    @AutoIncrement
    @Column({ allowNull: false })
    declare id: number;

    @Column
    foto: string;

    @Column
    detalhesVeiculoAPI: string;

    @Column({ allowNull: false })
    detalhesVeiculo: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}