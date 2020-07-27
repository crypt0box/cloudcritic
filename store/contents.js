import { firestoreAction, firestoreOptions } from 'vuexfire'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const contentsRef = db.collection('contents')
const userRef = db.collection('users')

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
  add: firestoreAction((context, {title, author, thumbnailUrl, id}) => {
    contentsRef.doc(id).set({
      title: title,
      author: author,
      thumbnailUrl: thumbnailUrl,
      totalLike: 0,
      category: 'book',
    })
    .then(() => {
      $nuxt.$router.push('/content/' + id)
    })
  }),
  updateTotalLike: firestoreAction((context, id) => {
    contentsRef.doc(id).update({
      totalLike: firebase.firestore.FieldValue.increment(1)
    })
  }),
  addTag: firestoreAction((context, { contentId, tag }) => {
    contentsRef.doc(contentId).collection('tags').add(tag)
  }),
  removeTag: firestoreAction((context, { contentId, tagId}) => {
    contentsRef.doc(contentId).collection('tags').doc(tagId).delete()
  }),
  updateLike: firestoreAction((context, { contentId, tagId　}) => {
    contentsRef.doc(contentId).collection('tags').doc(tagId).update({
      like: firebase.firestore.FieldValue.increment(1)
    })
  }),
  addFavorite: firestoreAction((context, contentId) => {
    const user = firebase.auth().currentUser
    userRef.doc(user.uid).set({
      favorite: firebase.firestore.FieldValue.arrayUnion(contentId)
    },
    {
      merge: true
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
  }),
  editComment: firestoreAction((context, commentData) => {
    contentsRef.doc(commentData.contentId).collection('comment').doc(commentData.commentId).update({
      comment: commentData.comment,
      createdAt: commentData.createdAt
    })
  }),
  removeComment: firestoreAction((context, {contentId, commentId}) => {
    contentsRef.doc(contentId).collection('comment').doc(commentId).delete()
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
