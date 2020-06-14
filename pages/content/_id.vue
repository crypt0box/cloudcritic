<template>
  <div>
    {{content}}
    <p>{{title}}{{tags}}</p>
  </div>
</template>

<script>
import { firestoreAction, firestoreOptions } from 'vuexfire'
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      title: '',
      author: '',
      thumbnailUrl: '',
      tags: {}
    }
  },
  created() {
    this.$store.dispatch('contents/initContent', this.$route.params.id)
  },
  computed: {
    content() {
      if (this.$store.getters['contents/getContent']) {
        this.title = this.$store.getters['contents/getContent'].title
        this.author = this.$store.getters['contents/getContent'].author
        this.thumbnailUrl = this.$store.getters['contents/getContent'].thumbnailUrl
        this.tags = this.$store.getters['contents/getContent'].tags
      }
    }
  }
}
</script>