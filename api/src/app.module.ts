import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { InformacoesVeiculoModule } from './informacoes-veiculo/informacoes-veiculo.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CorModule } from './cor/cor.module';

@Module({
  imports: [
    ClienteModule,
    VeiculoModule,
    ConfigModule.forRoot({
      cache: true,
    }),
    AuthModule,
    InformacoesVeiculoModule,
    CorModule,
    CategoriaModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
