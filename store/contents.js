import { firestoreAction, firestoreOptions } from 'vuexfire'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const contentsRef = db.collection('contents')

export const state = () => ({
  contents: [],
  content: {},
  tags: [],
})

export const mutations = {
}

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('contents', contentsRef)
  }),
  initContent: firestoreAction(({ bindFirestoreRef }, id) => {
    bindFirestoreRef('content', contentsRef.doc(id))
  }),
  initTags: firestoreAction(({ bindFirestoreRef }, id) => {
    bindFirestoreRef('tags', contentsRef.doc(id).collection('tags').orderBy('like', 'desc'))
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
  addTag: ((context, { id, tag }) => {
    contentsRef.doc(id).collection('tags').add(tag)
    $nuxt.$router.push('/content/' + id)
  }),
  updateLike: firestoreAction((context, { contentId, tagId　}) => {
    contentsRef.doc(contentId).collection('tags').doc(tagId).update({
      like: firebase.firestore.FieldValue.increment(1)
    })
  }),
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
}
