import APIService from './APIService';

export default {
    cadastrarCliente(cliente) {
        return APIService.apiCall().post(`cliente`, cliente);
    },
    buscarClientes() {
        return APIService.apiCall().get(`cliente`);
    },
    buscarCliente(id) {
        return APIService.apiCall().get(`cliente/id/${id}`);
    },
    atualizarCliente(id, cliente) {
        return APIService.apiCall().patch(`cliente/${id}`, cliente);
    },
}