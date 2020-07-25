import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const userRef = db.collection('users')

export const state = () => ({
  name: '',
  email: '',
  photoUrl: '',
  uid: '',
  favorite: '',
})

export const getDefaultState = () => ({
  name: '',
  email: '',
  photoUrl: '',
  uid: '',
  favorite: '',
})

export const mutations = {
  onAuthStateChanged(state, {name, email, photoUrl, uid}) {
    state.name = name
    state.email = email
    state.photoUrl = photoUrl
    state.uid = uid
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
  logout({ commit }) {
    firebase.auth().signOut().then(
      commit('resetState')
    )
  },
  onAuth({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // ** ログイン済のユーザー
          console.log('ok!!Login User!!')
          var name, email, photoUrl, uid,
          name = user.displayName
          email = user.email
          photoUrl = user.photoURL
          uid = user.uid
          commit('onAuthStateChanged', {
            name: name,
            email: email,
            photoUrl : photoUrl,
            uid: uid,
          })
          userRef.doc(uid).get()
            .then(doc => {
              if (doc.exists) {
                commit('onUserFavoriteChanged', doc.data().favorite)
              } else {
                  console.log("No such document!");
              }
            })
          resolve(user)
        } else {
          // ** ログインしていないユーザーもしくは認証が切れている
          resolve(false)
        }
      })
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
    return state.uid
  },
  getUserEmail(state) {
    return state.email
  },
  getUserName(state) {
    return state.name
  },
  getFavorite(state) {
    return state.favorite
  },
  getUserPhotoUrl(state) {
    return state.photoUrl
  },
};