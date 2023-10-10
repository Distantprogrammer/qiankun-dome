import { defineStore } from 'pinia'

export const useStore = defineStore('users', {
  state: () => {
    return {
      userInfo:'111111'
    }
  },
  actions: { // actions 可以给 store 保存一些额外的数据或操作，比如保存当前
   async setUserInfo(userInfo) {
      this.userInfo = userInfo
    }
  }
})