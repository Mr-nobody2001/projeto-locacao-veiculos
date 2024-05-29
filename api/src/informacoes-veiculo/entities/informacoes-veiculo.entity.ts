import { CreationOptional } from "sequelize";
import {Column, Table, Model, AutoIncrement, PrimaryKey} from "sequelize-typescript";

@Table
export class InformacoesVeiculo extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ allowNull: false })
    declare id: number;
    
    @Column({allowNull: false})
    foto: string;

    @Column({allowNull: false, unique: true})
    detalhesVeiculoAPI: string;

    @Column({allowNull: false})
    caracteristicas: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
