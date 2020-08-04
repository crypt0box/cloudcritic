<template>
  <section>
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
    },
  },
  computed:{
    contents() {
      return this.$store.getters['contents/getContents']
    },
  }
}
</script>