import {ArrayMinSize, IsArray, IsNotEmpty, IsUrl} from 'class-validator';

export class CreateInformacoesVeiculoDto {
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
