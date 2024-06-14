import APIService from "./APIService";

export default {
    buscarReservas() {
        return APIService.apiCall().get(`reservas-veiculos`);
    },
    buscarReserva(id) {
        return APIService.apiCall().get(`reservas-veiculos/${id}`);
    },
    reservarVeiculo(data) {
        return APIService.apiCall().post(`reservas-veiculos`, data);
    },
    checkIn(id, data) {
        return APIService.apiCall().patch(`reservas-veiculos/checkin/${id}`, data);
    },
    checkOut(id) {
        return APIService.apiCall().patch(`reservas-veiculos/checkout/${id}`);
    },
    cancelarReserva(id) {
        return APIService.apiCall().patch(`reservas-veiculos/cancelar/${id}`);
    },
    buscarVeiculosByInformacoesVeiculoId(id) {
        return APIService.apiCall().get(`veiculo/informacoes-veiculos/${id}`);
    }
}