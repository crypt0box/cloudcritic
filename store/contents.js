import { firestoreAction, firestoreOptions } from 'vuexfire'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const contentsRef = db.collection('contents')

export const state = () => ({
  contents: [],
  content: {}
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('contents', contentsRef)
  }),
  initContent: firestoreAction(({ bindFirestoreRef }, id) => {
    bindFirestoreRef('content', contentsRef.doc(id))
  }),
  add: firestoreAction((context, {title, author, thumbnailUrl, tags}) => {
    contentsRef.add({
      title: title,
      author: author,
      thumbnailUrl: thumbnailUrl,
      tags: tags,
      totalGoodjob: 0,
      category: 'book'
    })
  }),
  updateTotalGoodjob: firestoreAction((context, { id, goodjob }) => {
    contentsRef.doc(id).update({
      totalGoodjob: goodjob,
    })
  })
}

export const getters = {
  getContents(state) {
    return state.contents
  },
  getContent(state) {
    return state.content
  },
}
