import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateReservasVeiculosDto } from './dto/create-reservas-veiculos.dto';
import { ReservasVeiculosService } from './reservas-veiculos.service';
import { ReservaCheckInDto } from './dto/reserva-check-in.dto';

@Controller('reservas-veiculos')
export class ReservasVeiculosController {
  constructor(private reservasVeiculosService: ReservasVeiculosService) {}
  
  @Post()
  create(@Body() createReservasVeiculosDto: CreateReservasVeiculosDto) {
    return this.reservasVeiculosService.create(createReservasVeiculosDto);
  }

  @Patch("checkin/:id")
  checkIn(@Param('id') id: number, @Body() reservaCheckInDto: ReservaCheckInDto) {
    return this.reservasVeiculosService.checkIn(id, reservaCheckInDto);
  }

  @Patch("checkout/:id")
  checkOut(@Param('id') id: number) {
    return this.reservasVeiculosService.checkOut(id);
  }

  @Patch("cancelar/:id")
  cancelar(@Param('id') id: number) {
    return this.reservasVeiculosService.cancelar(id);
  }
}


