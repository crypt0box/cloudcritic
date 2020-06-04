export const state = () => ({
  results: []
})

export const mutations = {
  setResults(state, results) {
    state.results = results
  }
}

export const actions = {
  async search({ commit }, itemName) {
    const baseUrl = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?'
    const appId = 'applicationId=1061213804419554354'
    let keyword = `&keyword=${itemName}`
    const getUrl = encodeURI(baseUrl + appId + keyword)
    const response = await this.$axios.$get(getUrl)
    console.log(response)
    commit('setResults', response.Items)
  }
}

export const getters = {
  getResults(state) {
    return state.results
  }
}