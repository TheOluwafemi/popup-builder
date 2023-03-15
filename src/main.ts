import { createApp } from 'vue'
import App from './App.vue'
import 'vue3-toastify/dist/index.css'
import Vue3Toasity from 'vue3-toastify'
import { createPinia } from 'pinia'
import { usePopupStore } from './stores/popup'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(Vue3Toasity, {
  autoClose: 3000
})
app.use(pinia)
app.mount('#app')


// check if state is stored in local storage and load store state
// this must be below app.use(pinia)
const popupStore = usePopupStore()
const storedValues = localStorage.getItem('form-values')
const storedStyles = localStorage.getItem('form-styles')
if (storedValues) {
  popupStore.loadStoredState('formValues', storedValues)
}
if (storedStyles) {
  popupStore.loadStoredState('formStyles', storedStyles)
}
