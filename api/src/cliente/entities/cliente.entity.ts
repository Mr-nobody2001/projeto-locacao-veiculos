import {Column, Table, Model} from "sequelize-typescript";

@Table
export class Cliente extends Model {
    @Column({allowNull: false})
    nome: string;

    @Column({allowNull: false})
    data_nascimento: Date;

    @Column({allowNull: false})
    cpf: string;

    @Column({allowNull: false})
    telefone: string;

    @Column({allowNull: false})
    email: string;

    @Column({allowNull: false})
    senha: string;

    @Column({allowNull: false})
    endereco: string;

    @Column({allowNull: false, defaultValue: true})
    status: boolean;
}
