import firebase from '~/plugins/firebase'

const db = firebase.firestore()

export const state = () => ({
  contents: []
})

export const mutations = {
  onContentsChanged(state, contents) {
    state.contents = contents
  }
}

export const actions = {
  searchTag({ commit }, tagName) {
    const contents = []
    db.collectionGroup('tags').where('name', '==', tagName).get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        contents.push(doc.data())
      })
      return new Promise((resolve, reject) => {
        commit('onContentsChanged', contents)
        resolve(this.$router.push('/tag/search=' + contents[0].name))
      })
    })
  },
}

export const getters = {
  getContents(state) {
    return state.contents
  }
}