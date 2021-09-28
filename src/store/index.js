import { createStore } from 'vuex'

export default createStore({
  state: {
    humans: [],
    currentEpisode: null
  },
  mutations: {
    setHumans(state, payload) {
      state.humans.push(...payload)
    },
    setCurrentEpisode(state, payload) {
      state.currentEpisode = payload
    }
  },
  actions: {
    setHumans(context, payload) {
      context.commit('setHumans', payload)
    },
    setCurrentEpisode(context, payload) {
      context.commit('setCurrentEpisode', payload)
    }
  },
  modules: {}
})
