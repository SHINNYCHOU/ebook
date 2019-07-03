import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logstate: false,
    user: {username: '',
      usertype: 0}
  },
  mutations: {
    login (state, user) {
      state.logstate = true
      state.user = user
      console.log(state.user)
    },
    logout (state) {
      state.logstate = false
      state.user.username = ''
      state.user.usertype = 0
    }
  }
})
