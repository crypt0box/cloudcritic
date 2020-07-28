<template>
  <v-row>
    <v-col
      v-for="content in filterContents"
      :key="content.id"
      cols="6"
      md="3"
    >
      <v-card
        maxWidth="160"
        maxHeight="280"
        width="160"
        height="280"
      >
        <v-row justify="center">
          <nuxt-link :to="{path: `../content/${content.id}`, params: { contentID: content.id }}">
          <v-img
            :src="content.thumbnailUrl"
            maxWidth="150"
            maxHeight="220"
            width="150"
            height="220"
          />
          </nuxt-link>
        </v-row>
        <v-row justify="center">
          <v-card-actions>
            <v-btn
              class="ma-2"
              tile
              outlined 
              @click="countTotalLike(content.id)"
            >
              <v-icon center>mdi-thumb-up</v-icon> {{ content.totalLike }}
            </v-btn>
            <favorite-button :contentId="content.id"/>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import FavoriteButton from '~/components/FavoriteButton.vue'

export default {
  name: 'FavoriteCard',
  components: {
    FavoriteButton
  },
  created() {
    this.$store.dispatch('contents/init')
  },
  methods: {
    countTotalLike(contentId) {
      this.$store.dispatch('contents/updateTotalLike', contentId)
    },
  },
  computed: {
    filterContents() {
      const favorite = this.$store.getters['auth/getFavorite']
      if (favorite) {
        return this.$store.getters['contents/getContents']
        .filter(content => favorite.includes(content.id))
      }
    },
  },
}
</script>