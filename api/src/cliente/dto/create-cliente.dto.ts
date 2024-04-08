import {IsAlpha, IsAlphanumeric, IsDate, IsDefined, IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateClienteDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    data_nascimento: Date;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    cpf: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    telefone: string;

    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    senha: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    endereco: string;
}
