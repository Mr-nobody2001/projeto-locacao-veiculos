import APIService from './APIService';

export default {
    buscarInformacaoVeiculo(id) {
        return APIService.apiCall().get(`informacao-veiculo/${id}`);
    },
    cadastrarInformacaoVeiculo(informacaoVeiculo) {
        return APIService.apiCall().post(`informacao-veiculo`, informacaoVeiculo);
    },
    atualizarInformacaoVeiculo(id, informacaoVeiculo) {
        return APIService.apiCall().patch(`informacao-veiculo/${id}`, informacaoVeiculo);
    },
    buscarInformacaoVeiculos(){
        return APIService.apiCall().get(`informacao-veiculo`);
    }
}