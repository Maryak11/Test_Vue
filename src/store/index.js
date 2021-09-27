import { createStore } from 'vuex'

export default createStore({
  state: {
    humans: []
  },
  mutations: {
    setHumans(state, payload) {
      state.humans.push(...payload)
    }
  },
  actions: {
    setHumans(context, payload) {
      context.commit('setHumans', payload)
    }
  },
  modules: {}
})
