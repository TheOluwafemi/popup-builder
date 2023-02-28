import { createApp } from 'vue'
import App from './App.vue'
import 'vue3-toastify/dist/index.css'
import Vue3Toasity from 'vue3-toastify'

import './assets/main.css'

const app = createApp(App)
app.mount('#app')
app.use(Vue3Toasity, {
  autoClose: 3000
})