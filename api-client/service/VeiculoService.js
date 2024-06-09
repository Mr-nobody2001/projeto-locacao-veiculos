import APIService from './APIService';

export default {
  cadastrarVeiculo(dadosVeiculo) {
    return APIService.apiCall().post(`veiculo`, dadosVeiculo);
  },
  buscarInformacaoVeiculos() {
    return APIService.apiCall().get(`veiculo`);
  },
  buscarVeiculo(id) {
    return APIService.apiCall().get(`veiculo/${id}`);
  },

  atualizarVeiculo(id, dadosVeiculo) {
    return APIService.apiCall().patch(
      `veiculo/${id}`,
      dadosVeiculo
    );
  },

  buscarVeiculos() {
    return APIService.apiCall().get(`veiculo`);
  },

  deleteVeiculo(id) {
    return APIService.apiCall().delete(`veiculo/${id}`);
  },
};
