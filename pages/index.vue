<template>
  <section>
    <header>
      <nuxt-link :to="'users/' + $store.getters['auth/getUserUid']">user</nuxt-link>
      <nuxt-link :to="'CreateContent'">作成</nuxt-link>
      <button @click="show">クリックする</button>
      <modal name="modal-content" height="80%" width="80%" :scrollable="true">
        <select-image />
      </modal>
    </header>
    <body>
      <v-container>
        <v-row>
          <v-col
            v-for="content in contents"
            :key="content.id"
          >
          <a >
            <v-img
              :src="content.thumbnailUrl"
              maxWidth="100"
              maxHeight="140"
              class="white--text align-end"
            >
            </v-img>
          </a>
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
    this.$store.dispatch('contents/init');
  },
  methods: {
    show() {
      this.$modal.show("modal-content");
    },
    hide() {
      this.$modal.hide("modal-content");
    }
  },
  computed:{
    contents() {
      return this.$store.getters['contents/getContents']
    }
  }
}
</script>