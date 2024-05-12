import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from '@/router/router'
import store from './store.js'

import "toastify-js/src/toastify.css"

createApp(App)
    .use(router)
    .use(vuetify)
    .use(store)
    .mount('#app')
