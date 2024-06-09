import { Module } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import { Veiculo } from './entities/veiculo.entity';

@Module({
  controllers: [VeiculoController],
  providers: [
    VeiculoService,
    { provide: 'VEICULO_REPOSITORY', useValue: Veiculo }
  ],
})
export class VeiculoModule {}
