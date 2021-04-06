import Vue from "vue";
import Vuex from "vuex";
import decode from "jwt-decode"
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    usuario: ''
  },
  mutations: {
    obtainUser(state, payload) {
      state.token = payload;
      if (payload == '') {
        state.usuario = ''
      } else {
        state.usuario = decode(payload)
        router.push({ name: 'Tareas' })
      }
    }
  },
  actions: {
    saveUser({ commit }, payload) {
      localStorage.setItem('token', payload)
      commit('obtainUser', payload)
    },
    readToken({ commit }) {
      const token = localStorage.getItem("token")
      if (token) {
        commit('obtainUser', token)
      }
    },
    cerrarSesion({ commit }) {
      localStorage.removeItem('token')
      commit('obtainUser', '')
      router.push({ name: 'Login' })
    }
  },
  getters: {
    isActivo: state => !!state.token
  },
  modules: {},
});
