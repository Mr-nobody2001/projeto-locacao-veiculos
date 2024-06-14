import { IsDefined, IsNotEmpty } from "class-validator";

export class CreateInformacoesPagamentoDto {

    @IsDefined()
    @IsNotEmpty()
    cliente_id: number;

    @IsDefined()
    @IsNotEmpty()
    numero_cartao: string;

    @IsDefined()
    @IsNotEmpty()
    nome_titular: string;

    @IsDefined()
    @IsNotEmpty()
    validade: Date;

    @IsDefined()
    @IsNotEmpty()
    codigo_seguranca: number;
}
