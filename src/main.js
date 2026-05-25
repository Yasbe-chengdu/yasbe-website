import { createApp } from 'vue'
import { i18n, setupI18n } from './i18n'
import { setupLegalContent } from './data/legalContent/index.js'
import { revealDirective } from './directives/reveal'
import './styles/index.css'
import App from './App.vue'
import router from './router'

await setupI18n()
await setupLegalContent()

const app = createApp(App)

app.directive('reveal', revealDirective)
app.use(router).use(i18n).mount('#app')
