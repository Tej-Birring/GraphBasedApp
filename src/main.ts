import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// plugins
import backendConn from './plugins/backendConnector'
import type {BackendConnectorOptions} from './plugins/backendConnector'
const backendConnOpts: BackendConnectorOptions = {
    localDebugMode: true
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(backendConn, backendConnOpts)

app.mount('#app')
