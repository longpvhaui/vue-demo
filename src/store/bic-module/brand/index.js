import axios from "@/plugins/axios"

export default {
  namespaced: true,
  state: {
    brandName: 'Bic',
    brands: [],
  },
  getters: {

  },
  mutations: {
    SET_NAME(state, results){
      state.brands = results
    },
  },
  actions: {
    fetchBrandName({ commit }){
      return new Promise((resolve, reject) => {
        axios.get(`/api/ProductManager/get-all`)
          .then(response=>{
            commit('SET_NAME', response.data)
            resolve(response)           
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
}
