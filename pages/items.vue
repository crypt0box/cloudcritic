<template>
  <section class="container">
    <div>
      <nuxt-link :to="'users/' + $store.getters['auth/getUserUid']">user</nuxt-link>
      <button @click="show">クリックする</button>

      <modal name="modal-content">
          <p>モーダルウィンドウで表示されるコンテンツ</p>
      </modal>
    </div>
    <div>
      <input v-model="name">
      <v-btn @click="search">search</v-btn>
    </div>
    <div>
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
              class="white--text align-end"
            >
            </v-img>
          </a>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      results: []
    }
  },
  methods: {
    search() {
      this.$store.dispatch('items/search', this.name)
    },
    show() {
      this.$modal.show("modal-content");
    },
    hide() {
      this.$modal.hide("modal-content");
    }
  }
}
</script>