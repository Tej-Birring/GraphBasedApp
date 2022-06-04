import axios, {AxiosError} from "axios"
import type {AxiosInstance, AxiosRequestConfig} from "axios"
import type {App} from "vue"
import {useAuthStore} from "@/stores/auth";

const URL_DEV: string = "http://localhost:8000"
const URL_PROD: string = "https://graph-based-server.herokuapp.com"

interface BackendConnectorOptions {
    localDebugMode: boolean;
}

let tokenRefreshTimeout: any = null;
let refreshInterval = 15*60*1000; // 15 mins in ms
function clearTokenRefreshTimeout() {
    if (tokenRefreshTimeout) {
        clearTimeout(tokenRefreshTimeout)
    }
    tokenRefreshTimeout = null
}

const base = (options: BackendConnectorOptions) => { return axios.create({
    baseURL: options.localDebugMode ? URL_DEV : URL_PROD,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${getToken()}`
    }
}); }

// returns error message
function login(options: BackendConnectorOptions, email: string | null, phone: string | null, password: string | null): any {
    const store = useAuthStore()
    return base(options).post("login", {email, phone, password})
        .then((res)=>{
            const data = res?.data
            store.token = data?.Token
            tokenRefreshTimeout = setTimeout(()=>{
                refreshToken(options, store)
            }, refreshInterval)
            return null
        })
        .catch((err)=>{
            clearTokenRefreshTimeout()
            if (err instanceof AxiosError) {
                // console.log(err)
                const data = err?.response?.data
                return data?.UserFriendlyMessage ?? "An unknown error occurred while trying to log you in. Please contact us directly to resolve this issue."
            } else {
                // console.log(err)
                return "An unknown error occurred while trying to log you in. Please contact us directly to resolve this issue."
            }
        })
}

function refreshToken(options: BackendConnectorOptions, store: any) {
    return base(options).get("login")
        .then((res)=>{
            const data = res?.data
            store.token = data?.NewToken
            tokenRefreshTimeout = setTimeout(()=>{
                refreshToken(options, store)
            }, refreshInterval)
        }).catch((err)=>{
            // console.log(err)
            clearTokenRefreshTimeout()
            return err?.response?.data
        })
}

function logout() {
    const store = useAuthStore()
    store.token = null
    clearTokenRefreshTimeout()
}

function getToken(): string {
    const store = useAuthStore()
    if (store.token) return store.token
    else return ""
}

const plugin = {
    install(app: App, options: BackendConnectorOptions) {
        app.provide("backend", {
            connector: base(options),
            login: (email: string | null, phone: string | null, password: string | null) => login(options, email, phone, password),
            // refreshToken: () => refreshToken(base()),
            logout: () => logout()
        });
    }
}

export default plugin
export type {BackendConnectorOptions}
