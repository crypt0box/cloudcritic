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
            v-for="content in contents"
            :key="content.index"
            cols="6"
            md="2"
          >
          <v-row justify="center">
            <nuxt-link :to="'../content/' + content.contentId">
              <v-img
                :src="'http://books.google.com/books/content?id=' + content.contentId + '&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'"
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

const db = firebase.firestore();
const contentsRef = db.collection('contents');

export default {
  computed:{
    contents() {
      console.log(this.$store.getters['search/getContents']);
      return this.$store.getters['search/getContents'];
    },
  }
}
</script>

<style scoped>
.like-button {
  width: 100px;
}
</style>