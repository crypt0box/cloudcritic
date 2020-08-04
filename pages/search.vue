<template>
  <v-app>
    <v-container>
      <v-form @submit.prevent="search">
        <v-text-field 
          v-model="name"
          placeholder="作品名または作者で検索"
          append-icon="mdi-magnify"
        >
        </v-text-field>
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
  middleware: 'authenticated',
  data() {
    return {
      name: ''
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
      this.$store.dispatch('contents/add', {
        title: item.volumeInfo.title || '',
        author: item.volumeInfo.authors[0] || '',
        thumbnailUrl: item.volumeInfo.imageLinks.thumbnail || '',
        id: item.id
      })
    }
  }
}
</script>