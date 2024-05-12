import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

import cliente from "@/store/modules/cliente";

const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage,
    modules: [
        'cliente',
    ]
})

// Load Vuex
export default createStore({
    modules: {
        cliente,
    },
    plugins: [vuexLocal.plugin]
})