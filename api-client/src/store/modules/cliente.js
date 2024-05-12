const initialState = {
    id: null,
    name: null,
    email: null,
}

const state = {
    cliente: initialState,
}

const getters = {
    getCliente: state => state.cliente,
}

const actions = {

    async login({commit}, data) {
        sessionStorage.setItem('app-auth-token', data.access_token);

        const cliente = {
            id: data.payload.sub,
            name: data.payload.name,
            email: data.payload.email,
        }

        commit('SET_CLIENTE', cliente)
    },

    // async logout({ commit }) {
    //     AuthService.logout()
    //     commit('SET_USER', initialState)
    // }
}

const mutations = {
    SET_CLIENTE: (state, cliente) => (state.cliente = cliente),
}

export default {
    state,
    getters,
    actions,
    mutations,
}