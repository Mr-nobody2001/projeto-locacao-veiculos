import {InformacoesVeiculo} from "./entities/informacoes-veiculo.entity";

export const informacoesVeiculoProviders = [
    {
        provide: 'INFORMACOES_VEICULO_REPOSITORY',
        useValue: InformacoesVeiculo,
    },
];
