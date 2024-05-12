import {DataTypes} from "sequelize";
import {Column, Table, Model} from "sequelize-typescript";

@Table
export class Cliente extends Model {
    @Column({allowNull: false})
    nome: string;

    @Column({type: DataTypes.DATEONLY, allowNull: false})
    data_nascimento: Date;

    @Column({allowNull: false, unique: true})
    cpf: string;

    @Column({allowNull: false})
    telefone: string;

    @Column({allowNull: false, unique: true})
    email: string;

    @Column({allowNull: false})
    senha: string;

    @Column({allowNull: false})
    endereco: string;

    @Column({allowNull: false, defaultValue: true})
    status: boolean;
}
