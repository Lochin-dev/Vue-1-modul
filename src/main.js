import { createApp } from 'vue'
import App from '@/components/app/App.vue'
import "./index.css"
import uiCompanents from './ui-companents'

const app = createApp(App)

uiCompanents.map(component => app.component(component.name, component))

app.mount('#app')
