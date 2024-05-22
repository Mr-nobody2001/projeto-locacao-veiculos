import {Inject, Injectable, BadRequestException} from '@nestjs/common';
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
        return this.informacoesVeiculoRepository.findByPk(id);
    }

    async update(id: number, updateInformacoesVeiculoDto: UpdateInformacoesVeiculoDto) {
        const record = await this.informacoesVeiculoRepository.findByPk(id);
        if (!record) {
            throw new BadRequestException('Informações do veículo não encontrada');
        }

        let foto = record.foto;
        if (updateInformacoesVeiculoDto.foto) {
            foto = await this.fotosService.salvarFoto(updateInformacoesVeiculoDto.foto, 'veiculo');
        }
        
        return await this.informacoesVeiculoRepository.update({
            foto,
            detalhesVeiculoAPI: updateInformacoesVeiculoDto.detalhesVeiculoAPI,
            caracteristicas: updateInformacoesVeiculoDto.caracteristicas.join(','),
        }, { where: { id } });
    }

    remove(id: number) {
        return `This action removes a #${id} informacoesVeiculo`;
    }
}
