<template>
<div>
  <input v-model="name">
  <v-btn @click="search">search</v-btn>
  <v-container>
    <v-row>
      <v-col
        v-for="item in $store.getters['items/getResults']"
        :key="item.id"
      >
      <a :href="item.volumeInfo.previewLink">
        <v-img
          v-if="item.volumeInfo.imageLinks != undefined"
          :src="item.volumeInfo.imageLinks.thumbnail"
          maxWidth="100"
          maxHeight="120"
          class="white--text align-end"
        >
        </v-img>
      </a>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  methods: {
    search() {
      this.$store.dispatch('items/search', this.name)
    },
  }
}
</script>
