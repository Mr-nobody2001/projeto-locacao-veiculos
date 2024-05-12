import {PartialType} from '@nestjs/mapped-types';
import {CreateClienteDto} from './create-cliente.dto';
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    data_nascimento: Date;

    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    @IsNotEmpty()
    telefone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsString()
    @IsNotEmpty()
    endereco: string;
}
