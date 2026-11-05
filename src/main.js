// import './assets/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { fa } from 'vuetify/iconsets/fa'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/main.scss'
import VueGtag from 'vue-gtag'

const savedTheme = localStorage.getItem('theme') || 'light'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa
    }
  },

  theme: {
  defaultTheme: savedTheme === 'dark' ? 'myDarkTheme' : 'myTheme',
  themes: {
    myTheme: {
      dark: false,
      colors: {
        primary: '#3b82f6',
        background: '#f4f4f5',
        surface: '#ffffff',
        warning: '#ffedd5'
      }
    },
    myDarkTheme: {
      dark: true,
      colors: {
        primary: '#60a5fa',
        background: '#1A1D27',
        surface: '#1e293b',
        warning: '#1e293b'
      }
    }
  }
 }
})

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'
import { setupInterceptors } from '@/services/http'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.use(
  VueGtag,
  {
    config: { id: 'G-Z322K0TK90' }
  },
  router
)

app.mount('#app')

setupInterceptors(() => {
  const authStore = useAuthStore()
  authStore.logout()
})
