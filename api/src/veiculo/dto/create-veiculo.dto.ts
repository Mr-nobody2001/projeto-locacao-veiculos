import { IsDefined, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { VeiculoDisponibilidade } from "../entities/veiculo.entity";

export class CreateVeiculoDto {
    @IsDefined()
    @IsNotEmpty()
    informacoesVeiculoId: number;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    placa: string;

    @IsDefined()
    @IsNotEmpty()
    corId: number;

    @IsDefined()
    @IsNotEmpty()
    categoriaId: number;

    @IsDefined()
    @IsNotEmpty()
    quilometragem: number;

    @IsDefined()
    @IsNotEmpty()
    @IsEnum(VeiculoDisponibilidade)
    disponibilidade: VeiculoDisponibilidade;

    ultimaManutencao: Date;

}
