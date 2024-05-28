import APIService from './APIService';

export default {
  cadastrarVeiculo(informacaoVeiculo) {
    return APIService.apiCall().post(`veiculo`, informacaoVeiculo);
  },
  buscarInformacaoVeiculos() {
    return APIService.apiCall().get(`veiculo`);
  },
  buscarVeiculo(id) {
    return APIService.apiCall().get(`veiculo/${id}`);
  },

  atualizarVeiculo(id, informacaoVeiculo) {
    return APIService.apiCall().patch(
      `veiculo/${id}`,
      informacaoVeiculo
    );
  }
};
