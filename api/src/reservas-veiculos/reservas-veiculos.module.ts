import { Module } from '@nestjs/common';
import { DatabaseModule } from 'lib/database/database.module';
import { ReservasVeiculosController } from './reservas-veiculos.controller';
import { ReservasVeiculosService } from './reservas-veiculos.service';
import { ReservasVeiculos } from './entities/reservas-veiculos.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { InformacoesVeiculo } from 'src/informacoes-veiculo/entities/informacoes-veiculo.entity';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';

@Module({
    imports: [DatabaseModule],
    controllers: [ReservasVeiculosController],
    providers: [
        ReservasVeiculosService,
        { provide: "RESERVAS_VEICULOS_REPOSITORY", useValue: ReservasVeiculos },
        { provide: "CLIENTE_REPOSITORY", useValue: Cliente },
        { provide: 'INFORMACOES_VEICULO_REPOSITORY', useValue: InformacoesVeiculo },
        { provide: 'VEICULO_REPOSITORY', useValue: Veiculo },
    ],
})
export class ReservasVeiculosModule {}
