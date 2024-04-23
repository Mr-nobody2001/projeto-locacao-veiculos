import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { VeiculoModule } from './veiculo/veiculo.module';

@Module({
  imports: [ClienteModule, VeiculoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
