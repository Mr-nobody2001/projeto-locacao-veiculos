import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClienteModule} from './cliente/cliente.module';
import {VeiculoModule} from './veiculo/veiculo.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ClienteModule,
        VeiculoModule,
        ConfigModule.forRoot({
            cache: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
