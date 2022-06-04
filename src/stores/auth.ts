import { defineStore } from 'pinia'
import jwtDecode from "jwt-decode";

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: null
  }),
  getters: {
    userInfo(state) {
      if (state.token)
        return jwtDecode(state.token)
    },
    userName() {
      if (!this.userInfo) return
      const fName =  this.userInfo?.firstName ?? ""
      const lName = this.userInfo?.lastName ?? ""
      return (fName + " " + lName).trim()
    }
  }
  // actions: {
  //   increment() {
  //     this.counter++
  //   }
  // }
})
