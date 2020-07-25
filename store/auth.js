import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const userRef = db.collection('user')

export const state = () => ({
  id: '',
  email: '',
  username: '',
  favorite: [],
  iconName: '',
  iconUrl: '',
  status: false
})

export const getDefaultState = () => ({
  id: '',
  email: '',
  username: '',
  favorite: [],
  iconName: '',
  iconUrl: '',
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
  },
  onUserIconChanged(state, {iconName, iconUrl}) {
    state.iconName = iconName,
    state.iconUrl = iconUrl
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
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
      userRef.doc(res.user.uid).set({
        username: '',
        uid: res.user.uid,
        icon: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    })
  },
  login({ commit }, authData) {
    firebase.auth().signInWithEmailAndPassword(
      authData.email,
      authData.password,
    )
  },
  logout({ commit }) {
    firebase.auth().signOut().then(
      commit('resetState')
    )
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
  },
  uploadIcon({ commit }, { uid, iconName, iconUrl }) {
    userRef.doc(uid).update({
      iconName: iconName,
      iconUrl: iconUrl
    })
    commit('onUserIconChanged', {iconName: iconName, iconUrl: iconUrl})
  },
  deleteIcon({ commit }, uid) {
    userRef.doc(uid).update({
      iconName: '',
      iconUrl: '',
    })
    commit('onUserIconChanged', {iconName: '', iconUrl: ''})
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
  getIconName(state) {
    return state.iconName
  },
  getIconUrl(state) {
    return state.iconUrl
  },
  isSignedIn(state) {
    return state.status
  }
};