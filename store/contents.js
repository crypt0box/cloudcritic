import { firestoreAction, firestoreOptions } from 'vuexfire'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const contentsRef = db.collection('contents')
const userRef = db.collection('user')

export const state = () => ({
  contents: [],
  content: {},
  tags: [],
  comments: [],
})

export const mutations = {
}

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('contents', contentsRef)
  }),
  initContent: firestoreAction(({ bindFirestoreRef }, contentId) => {
    bindFirestoreRef('content', contentsRef.doc(contentId))
  }),
  initTags: firestoreAction(({ bindFirestoreRef }, id) => {
    bindFirestoreRef('tags', contentsRef.doc(id).collection('tags').orderBy('like', 'desc'))
  }),
  initComments: firestoreAction(({ bindFirestoreRef }, id) => {
    bindFirestoreRef('comments', contentsRef.doc(id).collection('comment').orderBy('createdAt', 'desc'))
  }),
  add: firestoreAction((context, {title, author, thumbnailUrl}) => {
    contentsRef.add({
      title: title,
      author: author,
      thumbnailUrl: thumbnailUrl,
      totalLike: 0,
      category: 'book',
    })
    .then(response => {
      $nuxt.$router.push('/content/' + response.id)
    })
  }),
  updateTotalLike: firestoreAction((context, id) => {
    contentsRef.doc(id).update({
      totalLike: firebase.firestore.FieldValue.increment(1)
    })
  }),
  addTag: firestoreAction((context, { id, tag }) => {
    contentsRef.doc(id).collection('tags').add(tag)
    $nuxt.$router.push('/content/' + id)
  }),
  updateLike: firestoreAction((context, { contentId, tagId　}) => {
    contentsRef.doc(contentId).collection('tags').doc(tagId).update({
      like: firebase.firestore.FieldValue.increment(1)
    })
  }),
  addFavorite: firestoreAction((context, contentId) => {
    const user = firebase.auth().currentUser
    userRef.doc(user.uid).update({
      favorite: firebase.firestore.FieldValue.arrayUnion(contentId)
    })
  }),
  removeFavorite: firestoreAction((context, contentId) => {
    const user = firebase.auth().currentUser
    userRef.doc(user.uid).update({
      favorite: firebase.firestore.FieldValue.arrayRemove(contentId)
    })
  }),
  addComment: firestoreAction((context, commentData) => {
    contentsRef.doc(commentData.contentId).collection('comment').add(commentData)
    $nuxt.$router.push('/content/' + commentData.contentId)
  })
}

export const getters = {
  getContents(state) {
    return state.contents
  },
  getContent(state) {
    return state.content
  },
  getTags(state) {
    return state.tags
  },
  getComments(state) {
    return state.comments
  }
}
