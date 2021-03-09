import { createStore } from 'vuex';
import { createPersistedState, createSharedMutations } from 'vuex-electron';

export default createStore({
  state: {
    count: 0,
  },
  mutations: {
    COMMIT_INCREMENT: (state) => {
      state.count = state.count++;
    },
  },
  getters: {
    count: (state) => state.count,
  },
  actions: {
    INCREMENT: ({ commit }) => commit('COMMIT_INCREMENT'),
  },
  modules: {},
  plugins: [
    createPersistedState({
      storageName: 'keeloc',
    }),
    createSharedMutations(),
  ],
});
