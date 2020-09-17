<template>
  <v-btn
    class="ma-2"
    tile
    outlined
    color="pink"
    @click="registerFavorite = !registerFavorite; removeFavorite()"
    v-if="registerFavorite"
  >
    <v-icon 
      center
    >
    mdi-heart
    </v-icon>
  </v-btn>
  <v-btn 
    class="ma-2"
    tile
    outlined
    color="pink"
    @click="registerFavorite = !registerFavorite; addFavorite()"
    v-else
  >
    <v-icon 
      center
    >
    mdi-heart-outline
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'FavoriteButton',
  props: ['contentId'],
  data() {
    return {
      registerFavorite: true,
    }
  },
  methods: {
    addFavorite() {
      this.$store.dispatch('contents/addFavorite', this.contentId);
    },
    removeFavorite() {
      this.$store.dispatch('contents/removeFavorite', this.contentId);
    }
  }
}
</script>