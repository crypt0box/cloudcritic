<template>
  <v-app>
    <v-container>
      <v-form>
        <v-text-field v-model="name"></v-text-field>
        <v-btn @click="search">書籍検索</v-btn>
      </v-form>
    </v-container>
    <v-row>
      <v-col
        v-for="item in $store.getters['contentsAPI/getResults']"
        :key="item.id"
      >
      <a @click="register(item)">
        <v-img
          v-if="item.volumeInfo.imageLinks != undefined"
          :src="item.volumeInfo.imageLinks.thumbnail"
          maxWidth="100"
          maxHeight="140"
          class="white--text align-end"
        >
        </v-img>
      </a>
      </v-col>
    </v-row>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      name: '',
      title: '',
      author: '',
      thumbnailUrl: '',
    }
  },
  methods: {
    search() {
      this.$store.dispatch('contentsAPI/search', this.name)
    },
    register(item) {
      if (item.volumeInfo.authors) {
        this.author = item.volumeInfo.authors[0]
      }
      this.title = item.volumeInfo.title
      this.thumbnailUrl = item.volumeInfo.imageLinks.thumbnail
      this.$store.dispatch('contents/add', {
        title: this.title,
        author: this.author,
        thumbnailUrl: this.thumbnailUrl,
      })
    }
  }
}
</script>