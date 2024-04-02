import axios from "@/plugins/axios"

export default {
  namespaced: true,
  state: {
    cttv: {},
    listCTTV: [],
  },
  getters: {

  },
  mutations: {
    SET_LIST(state, results){
      state.listCTTV = results
    },
    SET_CTTV(state, results){
      state.cttv = results
    },
  },
  actions: {
    fetchListCTTV({ commit }, item){
      return new Promise((resolve, reject) => {
        axios.post(`/api/CTTV/search`, item)
          .then(response=>{
            commit('SET_LIST', response.data)
            resolve(response)           
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getDetail( { commit }, item){
      return new Promise((resolve, reject) => {
        axios.post('/api/CTTV/detail', item)
          .then(response=>{
            commit('SET_CTTV', response.data[0])
            resolve(response) 
          }).catch(error => {
            reject(error)
          })
      })
    },
  },
}
