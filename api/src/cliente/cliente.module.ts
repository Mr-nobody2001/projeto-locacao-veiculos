import {Module} from '@nestjs/common';
import {ClienteService} from './cliente.service';
import {ClienteController} from './cliente.controller';
import {DatabaseModule} from "../../lib/database/database.module";
import {clienteProviders} from "./cliente.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [ClienteController],
    providers: [ClienteService,
        ...clienteProviders,
    ],
    exports: [ClienteService],
})
export class ClienteModule {
}
