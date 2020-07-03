import firebase from '~/plugins/firebase'

const db = firebase.firestore()

export const state = () => ({
  userId: {},
  status: false
})

export const mutations = {
  onAuthStateChanged(state, userId) {
    state.userId = userId; //firebaseが返したユーザー情報
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
    .then(res => {
      commit('onAuthStateChanged', res.user.uid);
      commit('onUserStatusChanged', res.user.uid ? true : false);
    })
  },
  onAuth({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
    })
  }
}

export const getters = {
  userId(state) {
    return state.userId;
  },
  isSignedIn(state) {
    return state.status;
  }
};
