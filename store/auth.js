import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const userRef = db.collection('users')

export const state = () => ({
  name: '',
  email: '',
  photoUrl: '',
  uid: '',
  favorite: '',
  status: false,
})

export const getDefaultState = () => ({
  name: '',
  email: '',
  photoUrl: '',
  uid: '',
  favorite: '',
  status: false,
})

export const mutations = {
  onAuthStateChanged(state, {name, email, photoUrl, uid, status}) {
    state.name = name
    state.email = email
    state.photoUrl = photoUrl
    state.uid = uid
    state.status = status
  },
  onUserFavoriteChanged(state, favorite) {
    state.favorite = favorite;
  },
  onUserNameChanged(state, displayName) {
    state.name = displayName
  },
  onUserPhotoChanged(state, photoUrl) {
    state.photoUrl = photoUrl
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  }
}

export const actions = {
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
            status: true
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
  updateDisplayName({ commit }, { uid, displayName}) {
    var user = firebase.auth().currentUser;
    user.updateProfile({displayName: displayName}
    ).then(() => {
      // Update successful.
      console.log('ユーザー名の更新に成功したよ')
    }).catch((error) => {
      // An error happened.
      console.log('ユーザー名の更新に失敗', error)
    });
    userRef.doc(uid).update({displayName: displayName})
    commit('onUserNameChanged', displayName)
  },
  updatePhotoUrl({ commit }, { uid, photoUrl}) {
    var user = firebase.auth().currentUser;
    user.updateProfile({photoURL: photoUrl}
    ).then(() => {
      // Update successful.
      console.log('photoUrlの更新に成功したよ')
    }).catch((error) => {
      // An error happened.
      console.log('photoUrlの更新に失敗', error)
    });
    userRef.doc(uid).update({photoURL: photoUrl})
    commit('onUserPhotoChanged', photoUrl)
  },
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