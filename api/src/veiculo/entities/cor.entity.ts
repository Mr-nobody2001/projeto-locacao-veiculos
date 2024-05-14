import { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({tableName:'Cores'})
export class Cor extends Model<InferAttributes<Cor>, InferCreationAttributes<Cor>> {
    @PrimaryKey
    @AutoIncrement
    @Column({ allowNull: false })
    declare id: number;

    @Column({ allowNull: false })
    nome: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>; 
}