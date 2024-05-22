import APIService from './APIService';
import router from "@/router/router";

export default {
    login(data) {
        return APIService.apiCall()
            .post(`/login`, data)
            .then((res) => {
                const redirect = sessionStorage.getItem("redirectLogin");
                if (redirect) {
                    router.push(redirect);
                }
                return res;
            })
    },
}