import APIService from './APIService';

export default {
    cadastrarCliente(cliente) {
        return APIService.apiCall().post(`cliente`, cliente);
    },
}