import firebase from '~/plugins/firebase'

const db = firebase.firestore()

export const state = () => ({
  id: '',
  email: '',
  status: false
})

export const mutations = {
  onAuthStateChanged(state, {id, email}) {
    state.id = id  //firebaseが返したユーザー情報
    state.email = email
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
      user = user ? user : {}
      if(user) {
        const { uid, email } = user
        commit('onAuthStateChanged', {id: uid, email: email})
        commit('onUserStatusChanged', uid ? true : false)
      } else {
        console.log('user inai')
      }
    })
  }
}

export const getters = {
  getUserId(state) {
    return state.id
  },
  getUserEmail(state) {
    return state.email
  },
  isSignedIn(state) {
    return state.status
  }
};
