import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: null
  }),
  // actions: {
  //   increment() {
  //     this.counter++
  //   }
  // }
})
