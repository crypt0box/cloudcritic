<template>
  <section>
    <header>
      <nuxt-link :to="'CreateContent'">作成</nuxt-link>
      <button @click="show">クリックする</button>
      <modal name="modal-content" height="80%" width="80%" :scrollable="true">
        <select-image />
      </modal>
      {{user}}
    </header>
    <body>
      <v-container>
        <v-row>
          <v-col
            v-for="content in contents"
            :key="content.id"
          >
          <nuxt-link :to="'content/' + content.id">
            <v-img
              :src="content.thumbnailUrl"
              maxWidth="100"
              maxHeight="140"
              class="white--text align-end"
            >
            </v-img>
          </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </body>
  </section>
</template>

<script>
import SelectImage from '~/components/SelectImage.vue'

export default {
  components: {
    SelectImage
  },
  data() {
    return {
      name: '',
    }
  },
  created() {
    this.$store.dispatch('contents/init')
    this.$store.dispatch('auth/onAuth')
  },
  methods: {
    show() {
      this.$modal.show("modal-content")
    },
    hide() {
      this.$modal.hide("modal-content")
    }
  },
  computed:{
    contents() {
      return this.$store.getters['contents/getContents']
    },
    user() {
      console.log(this.$store.getters['auth/userId'])
      return this.$store.getters['auth/userId']
    }
  }
}
</script>