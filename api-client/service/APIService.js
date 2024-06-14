import axios from 'axios';
import store from '@/store';
import router from "@/router/router";

function getLocalToken() {
    return sessionStorage.getItem('app-auth-token');
}

function getUserId() {
    const { getCliente } = store.getters;
    return getCliente.id;
}

export default {
    apiCall(baseURL = '') {
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        if (baseURL === 'https://parallelum.com.br') {
            headers['X-Subscription-Token'] = process.env.VUE_APP_FIPE_API_TOKEN;
        }

        let call = axios.create({
            baseURL: baseURL || process.env.VUE_APP_API_URL,
            headers: baseURL ? headers : getCustomHeaders(headers),
            timeout: 60 * 120 * 1000,
        });

        call.interceptors.response.use(
            response => {
                if (response.status === 200 || response.status === 201) {
                    return Promise.resolve(response);
                } else {
                    return Promise.reject(response);
                }
            },
            error => {
                if (error.response && error.response.status) {
                    switch (error.response.status) {
                        case 401:
                        case 403:
                            sessionStorage.setItem("redirectLogin", router.currentRoute.value.fullPath);
                            router.push({name: 'LoginForm'});
                            break;
                    }
                    return Promise.reject(error.response);
                } else {
                    return Promise.reject(error);
                }
            },
        );

        return call;
    },
}

function getCustomHeaders(headers) {
    const token = getLocalToken();
    if (token && token !== 'undefined') {
        headers.Authorization = `Bearer ${token}`;

        const clienteId = getUserId();
        if (clienteId) {
            headers.UserId = clienteId;
        }
    }

    return headers;
}