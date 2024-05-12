import {Module} from '@nestjs/common';
import {InformacoesVeiculoService} from './informacoes-veiculo.service';
import {InformacoesVeiculoController} from './informacoes-veiculo.controller';
import {DatabaseModule} from "../../lib/database/database.module";
import {informacoesVeiculoProviders} from "./informacoes-veiculo.providers";
import {FotosService} from "../services/FotosService";

@Module({
    imports: [DatabaseModule],
    controllers: [InformacoesVeiculoController],
    providers: [InformacoesVeiculoService,
        ...informacoesVeiculoProviders,
        FotosService],
    exports: [InformacoesVeiculoService],
})
export class InformacoesVeiculoModule {
}
