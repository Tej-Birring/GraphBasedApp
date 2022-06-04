// styles
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// external plugins
//

// internal plugins
// backend
import backendConn from './plugins/backendConnector'
import type {BackendConnectorOptions} from './plugins/backendConnector'
const backendConnOpts: BackendConnectorOptions = {
    localDebugMode: true
}
// ui
import "@/assets/icons/linearicons/style.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(backendConn, backendConnOpts)

app.mount('#app')
