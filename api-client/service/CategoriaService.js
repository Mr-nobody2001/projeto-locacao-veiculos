import APIService from './APIService';

export default {
  
  buscarCategorias() {
    return APIService.apiCall().get(`categoria`);
  },

};
