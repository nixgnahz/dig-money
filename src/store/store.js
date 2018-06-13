import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: {
      DigMoneyFlag: true,
      GainListFlag: false,
      InviteCodeFlag: false,
      MoneyListFlag: false,
      SignFlag: false,
      TaskListFlag: false
    },
    lastPageFlag: '',
    nowPageFlag: '',
    userToken: ''
  },
  mutations: {
    changePageFlag (state, payload) {
      state.page[payload.value.last] = !state.page[payload.value.last]
      state.page[payload.value.now] = !state.page[payload.value.now]
    },
    setUserToken (state, value) {
      state.userToken = value
    }
  }
})
