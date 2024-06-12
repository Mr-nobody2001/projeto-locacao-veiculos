import { IsDefined, IsNotEmpty } from 'class-validator';

export class ReservaCheckInDto {
    @IsDefined()
    @IsNotEmpty()
    veiculoId: number;
}
