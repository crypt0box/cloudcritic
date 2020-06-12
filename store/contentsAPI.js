export const state = () => ({
  results: [],
  item: []
})

export const mutations = {
  setResults(state, results) {
    state.results = results
  },
  setItem(state, item) {
    state.item = item
  }
}

export const actions = {
  async search({ commit }, itemName) {
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q='
    let keyword = `${itemName}`
    const getUrl = baseUrl + keyword
    const response = await this.$axios.$get(getUrl)
    console.log(response)
    commit('setResults', response.items)
  },
  update({ commit }, item) {
    commit('setItem', item)
  }
}

export const getters = {
  getResults(state) {
    return state.results
  },
  getItem(state) {
    return state.item
  }
}