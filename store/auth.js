import firebase from '~/plugins/firebase'

const db = firebase.firestore()

export const state = () => ({
  user: {},
  status: false
})

export const mutations = {
  onAuthStateChanged(state, user) {
    state.user = user; //firebaseが返したユーザー情報
  },
  onUserStatusChanged(state, status) {
    state.status = status; //ログインしてるかどうか true or false
  }
}

export const actions = {
  register({}, authData) {
    firebase.auth().createUserWithEmailAndPassword(
      authData.email,
      authData.password,
    )
    .then(response => {
      console.log(response)
    })
  },
  login({ commit }, authData) {
    firebase.auth().signInWithEmailAndPassword(
      authData.email,
      authData.password,
    )
  },
  onAuth({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user: {}
      commit('onAuthStateChanged', user)
      commit('onUserStatusChanged', user.uid ? true : false)
    })
  }
}

export const getters = {
  user(state) {
    return state.user;
  },
  isSignedIn(state) {
    return state.status;
  }
};
