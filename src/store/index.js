// eslint-disable-next-line import/default
import { createStore } from 'vuex'

// // mutation-types.js
// export const SOME_MUTATION = 'SOME_MUTATION'
// Modules
import brand from './bic-module/brand'
import cttv from './bic-module/cttv'


export default createStore({
  modules: {
    brand,
    cttv,
  },
  actions: {

  },
  state: {

  },
  mutations: {
    //     [SOME_MUTATION] (state) {
    //       // mutate state
    //     },
  },
  getters: {
     
  },
})