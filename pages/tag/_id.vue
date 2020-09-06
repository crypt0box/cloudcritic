<template>
  <section>
    <body>
      <v-container>
        <v-row>
          <h1>タグ：{{ contents[0].name }}</h1>
        </v-row>
        <v-divider />
        <v-row style="padding-top: 3%;">
          <v-col
            v-for="(content, index) in contents"
            :key="content.id"
            cols="6"
            md="2"
          >
          <v-row justify="center">
            <nuxt-link :to="'../content/' + content.contentId">
              <v-img
                :src="thumbnailUrl[index]"
                maxWidth="100"
                maxHeight="140"
                width="100"
                height="140"
              >
              </v-img>
            </nuxt-link>
          </v-row>
          <v-row justify="center">
            <v-btn 
              text
              class="like-button"
            >
              <v-icon left>mdi-thumb-up</v-icon>
              {{ content.like }}
            </v-btn>
          </v-row>
          </v-col>
        </v-row>
      </v-container>
    </body>
  </section>
</template>

<script>
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const contentsRef = db.collection('contents')

export default {
  data() {
    return {
      thumbnailUrl: []
    }
  },
  created() {
    this.$store.getters['search/getContents'].forEach(element => {
      contentsRef.doc(element.contentId).get()
      .then(doc => {
        this.thumbnailUrl.push(doc.data().thumbnailUrl)
      })
    });
  },
  computed:{
    contents() {
      return this.$store.getters['search/getContents']
    },
  }
}
</script>

<style scoped>
.like-button {
  width: 100px;
}
</style>