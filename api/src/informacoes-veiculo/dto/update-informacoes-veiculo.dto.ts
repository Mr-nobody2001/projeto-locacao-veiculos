import {PartialType} from '@nestjs/mapped-types';
import {ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUrl} from 'class-validator';
import {CreateInformacoesVeiculoDto} from "./create-informacoes-veiculo.dto";

export class UpdateInformacoesVeiculoDto extends PartialType(CreateInformacoesVeiculoDto) {
    @IsNotEmpty()
    foto: string;

    @IsNotEmpty()
    @IsUrl({}, {message: 'Os detalhes do veículo devem ser uma URL válida.'})
    detalhesVeiculoAPI: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1, {message: 'O array de caracteristicas deve ter pelo menos um elemento.'})
    caracteristicas: string[];
}
