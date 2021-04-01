import { createApp } from 'vue'
import App from './App.vue'
import lazyPlugin from 'vue3-lazy'
import './styles/styles.scss'

const app = createApp(App)
app.use(lazyPlugin, {
  loading: 'loading.png',
  error: 'error.png'
})
app.mount('#app')