import axios from "axios"
import type {AxiosInstance, AxiosRequestConfig} from "axios"
import type {App} from "vue"

const URL_DEV: string = "http://localhost:8000"
const URL_PROD: string = "https://graph-based-server.herokuapp.com"

interface BackendConnectorOptions {
    localDebugMode: boolean;
}

const plugin = {
    install(app: App, options: BackendConnectorOptions) {
        const base: AxiosInstance = axios.create({
            baseURL: options.localDebugMode ? URL_DEV : URL_PROD,
            timeout: 5000,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        app.provide("backendConn", base);
    }
}

export default plugin
export type {BackendConnectorOptions}
