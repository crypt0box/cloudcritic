import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const userRef = db.collection('user')

export const state = () => ({
  id: '',
  email: '',
  username: '',
  favorite: [],
  status: false
})

export const mutations = {
  onAuthStateChanged(state, {id, email, username}) {
    state.id = id  //firebaseが返したユーザー情報
    state.email = email
    state.username = username
  },
  onUserStatusChanged(state, status) {
    state.status = status; //ログインしてるかどうか true or false
  },
  onUserFavoriteChanged(state, favorite) {
    state.favorite = favorite;
  }
}

export const actions = {
  register({}, authData) {
    firebase.auth().createUserWithEmailAndPassword(
      authData.email,
      authData.password,
    )
    .then(res => {
      res.user.updateProfile({
        displayName: authData.displayName
      })
      console.log('1:', res)
      userRef.doc(res.user.uid).set({
        username: res.user.displayName,
        favorite: firebase.firestore.FieldValue.arrayUnion('test'),
        uid: res.user.uid,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
    })
  },
  login({ commit }, authData) {
    firebase.auth().signInWithEmailAndPassword(
      authData.email,
      authData.password,
    )
  },
  logout() {
    firebase.auth().signOut()
  },
  onAuth({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : {}
      if(user) {
        const { uid, email, displayName } = user
        userRef.doc(uid).update({
          username: displayName,
        })
        commit('onAuthStateChanged', {id: uid, email: email, username: displayName})
        commit('onUserStatusChanged', uid ? true : false)
        userRef.doc(uid).get().then(res => {
          commit('onUserFavoriteChanged', res.data().favorite)
        })
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
  getUserName(state) {
    return state.username
  },
  getFavorite(state) {
    return state.favorite
  },
  isSignedIn(state) {
    return state.status
  }
};