import APIService from './APIService';

export default {
    login(data) {
        return APIService.apiCall().post(`/login`, data);
    },
}