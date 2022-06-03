import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'user',
  state: () => ({
    token: null
  }),
  // actions: {
  //   increment() {
  //     this.counter++
  //   }
  // }
})
