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
        let call = axios.create({
            baseURL: baseURL || process.env.VUE_APP_API_URL,
            headers: getCustomHeaders(),
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
                            router.push({name: 'Login'});
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

function getCustomHeaders() {

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }

    const token = getLocalToken();
    if (token && token !== 'undefined') {
        headers.Authorization = `Bearer ${token}`;

        const clienteId = getUserId();
        if (clienteId) {
            headers.UserId = clienteId;
        }

        console.log(clienteId)

        return headers;
    }
}