import firebase from '~/plugins/firebase'

const db = firebase.firestore()

export const state = () => ({
  userUid: '',
  userEmail: '',
  idToken: null,
})

export const mutations = {
  setUserUid(state, userUid) {
  state.userUid = userUid
  },
  setUserEmail(state, userEmail) {
  state.userEmail = userEmail
  },
  setIdToken(state, idToken) {
  state.idToken = idToken
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
    .then(response => {
      const user = response.user;
      commit('setUserUid', user.uid)
      commit('setUserEmail', user.email)
      },
    )
  },
  updateIdToken({ commit }) {
    firebase.auth().onAuthStateChanged(async currentUser => {
      if(currentUser) {
      const idToken = await currentUser.getIdToken();
      commit('setIdToken', idToken)
      }
    })
  }
}

export const getters = {
  getUserUid(state) {
    return state.userUid
  },
  getUserEmail(state) {
    return state.userEmail
  },
  getIdToken(state) {
    return state.idToken
  }
}
