import { IsDate, IsDefined, IsNotEmpty } from "class-validator";

export class CreateReservasVeiculosDto {
    @IsDefined()
    @IsNotEmpty()
    informacoesVeiculoId: number;

    @IsDefined()
    @IsNotEmpty()
    clienteId: number;

    @IsDefined()
    @IsNotEmpty()
    checkInForecast: Date;

    @IsDefined()
    @IsNotEmpty()
    checkOutForecast: Date;
}
