import {Inject, Injectable} from '@nestjs/common';
import {CreateInformacoesVeiculoDto} from './dto/create-informacoes-veiculo.dto';
import {UpdateInformacoesVeiculoDto} from './dto/update-informacoes-veiculo.dto';
import {InformacoesVeiculo} from "./entities/informacoes-veiculo.entity";
import {FotosService} from "../services/FotosService";

@Injectable()
export class InformacoesVeiculoService {
    constructor(
        @Inject('INFORMACOES_VEICULO_REPOSITORY')
        private informacoesVeiculoRepository: typeof InformacoesVeiculo,
        private readonly fotosService: FotosService
    ) {
    }

    async create(createInformacoesVeiculoDto: CreateInformacoesVeiculoDto) {
        const caminhoImagem = await this.fotosService.salvarFoto(createInformacoesVeiculoDto.foto, 'veiculo');

        return await this.informacoesVeiculoRepository.create({
            foto: caminhoImagem,
            detalhesVeiculoAPI: createInformacoesVeiculoDto.detalhesVeiculoAPI,
            caracteristicas: createInformacoesVeiculoDto.caracteristicas.join(','),
        });
    }

    findAll() {
        return this.informacoesVeiculoRepository.findAll();
    }

    findOne(id: number) {
        return `This action returns a #${id} informacoesVeiculo`;
    }

    update(id: number, updateInformacoesVeiculoDto: UpdateInformacoesVeiculoDto) {
        return `This action updates a #${id} informacoesVeiculo`;
    }

    remove(id: number) {
        return `This action removes a #${id} informacoesVeiculo`;
    }
}
