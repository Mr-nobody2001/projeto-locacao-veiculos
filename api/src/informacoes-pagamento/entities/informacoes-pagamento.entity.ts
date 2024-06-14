import { CreationOptional, NonAttribute } from "sequelize";
import { Column, Table, Model, PrimaryKey, AutoIncrement, BelongsTo } from "sequelize-typescript";
import { Cliente } from "src/cliente/entities/cliente.entity";




@Table
export class InformacoesPagamento extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ allowNull: false })
    declare id: number;

    @Column({ allowNull: false })
    cliente_id: number;

    @Column({ allowNull: false})
    numero_cartao: string;

    @Column({ allowNull: false })
    nome_titular: string;

    @Column({ allowNull: false })
    validade: Date;

    @Column({ allowNull: false, defaultValue: 0 })
    codigo_seguranca: number;


    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    @BelongsTo(() => Cliente, 'cliente_id')
    declare Cliente?: NonAttribute<Cliente>;


}
