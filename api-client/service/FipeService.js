import APIService from './APIService';

export default {
    getMarcasVeiculo() {
        return APIService.apiCall('https://parallelum.com.br').get(`/fipe/api/v1/carros/marcas`);
    },

    getModelosVeiculo(marcaVeiculo) {
        return APIService.apiCall('https://parallelum.com.br').get(`/fipe/api/v1/carros/marcas/${marcaVeiculo}/modelos`);
    },

    getDataDeLancamentoVeiculo(marcaVeiculo, modeloVeiculo) {
        return APIService.apiCall('https://parallelum.com.br').get(`/fipe/api/v1/carros/marcas/${marcaVeiculo}/modelos/${modeloVeiculo}/anos`);
    },
}