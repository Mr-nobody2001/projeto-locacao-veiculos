import APIService from './APIService';

export default {
    cadastrarInformacaoVeiculo(informacaoVeiculo) {
        return APIService.apiCall().post(`informacao-veiculo`, informacaoVeiculo);
    },

    buscarInformacaoVeiculos(){
        return APIService.apiCall().get(`informacao-veiculo`)
    }
}