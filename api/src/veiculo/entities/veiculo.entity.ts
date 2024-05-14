import { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from "sequelize";
import { Column, Table, Model, PrimaryKey, AutoIncrement, BelongsTo } from "sequelize-typescript";
import { InformacaoVeiculo } from "./informacao-veiculo.entity";
import { Cor } from "./cor.entity";
import { Categoria } from "./categoria.entity";

export enum VeiculoDisponibilidade {
    manutencao = 'manutencao',
    disponivel = 'disponivel',
    indisponivel = 'indisponivel'
}

@Table
export class Veiculo extends Model<InferAttributes<Veiculo>, InferCreationAttributes<Veiculo>> {
    @PrimaryKey
    @AutoIncrement
    @Column({ allowNull: false })
    declare id: number;

    @Column({ allowNull: false })
    informacoesVeiculoId: number;

    @Column({ allowNull: false, unique: true })
    placa: string;

    @Column({ allowNull: false })
    corId: number;

    @Column({ allowNull: false })
    categoriaId: number;

    @Column({ allowNull: false, defaultValue: 0 })
    quilometragem: number;

    @Column({ allowNull: false })
    disponibilidade: VeiculoDisponibilidade;

    @Column
    ultimaManutencao: Date;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    @BelongsTo(() => InformacaoVeiculo, 'informacoesVeiculoId')
    declare informacaoVeiculo?: NonAttribute<InformacaoVeiculo>;

    @BelongsTo(() => Cor, 'corId')
    declare cor?: NonAttribute<Cor>;

    @BelongsTo(() => Categoria, 'categoriaId')
    declare categoria?: NonAttribute<Categoria>;
}
