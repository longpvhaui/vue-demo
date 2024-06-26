import axios from "@/plugins/axios"

export default {
  namespaced: true,
  state: {
    brand: {},
    brands: [],
  },
  getters: {

  },
  mutations: {
    SET_NAME(state, results){
      state.brands = results
    },
    SET_DETAIL(state, results){
      state.brand = results
    },
  },
  actions: {
    fetchBrandName({ commit }, item){
      return new Promise((resolve, reject) => {
        axios.post(`/api/ToChuc/search`, item)
          .then(response=>{
            commit('SET_NAME', response.data)
            resolve(response)           
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getDetail( { commit }, item){
      return new Promise((resolve, reject) => {
        axios.post('/api/ToChuc/detail', item)
          .then(response=>{
            commit('SET_DETAIL', response.data[0])
            resolve(response) 
          }).catch(error => {
            reject(error)
          })
      })
    },
  },
}
