import { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({tableName:'Categorias'})
export class Categoria extends Model<InferAttributes<Categoria>, InferCreationAttributes<Categoria>> {
    @PrimaryKey
    @AutoIncrement
    @Column({ allowNull: false })
    declare id: number;

    @Column({ allowNull: false })
    nome: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}