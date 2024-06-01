import APIService from './APIService';

export default {
  
  buscarCores() {
    return APIService.apiCall().get(`cor`);
  },

};
