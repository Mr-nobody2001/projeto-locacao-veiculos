import APIService from './APIService';

export default {
    cadastrarPagamento(data) {
        return APIService.apiCall().post(`informacoes-pagamento`, data);
    },

}