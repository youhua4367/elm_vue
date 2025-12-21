import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createPinia } from 'pinia'
import { createPersistedState } from "pinia-plugin-persistedstate"

import "./assets/main.scss"
import "normalize.css"
import "@/assets/css/global.css"
import "font-awesome/css/font-awesome.min.css"

const app = createApp(App)
const pinia = createPinia()
const persist = createPersistedState()

app.use(ElementPlus)
app.use(pinia)
app.use(router)
pinia.use(persist)

app.mount('#app')