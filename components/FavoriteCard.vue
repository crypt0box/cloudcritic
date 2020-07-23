<template>
  <v-row>
    <v-col
      v-for="content in filterContents"
      :key="content.id"
      cols="6"
      md="3"
    >
      <v-card
        maxWidth="150"
        maxHeight="270"
        width="150"
        height="270"
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
        <v-row>
          <v-col>
            <v-icon center>mdi-thumb-up</v-icon> {{ content.totalLike }}
          </v-col>
          <v-col>
            <v-icon center>mdi-heart</v-icon>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FavoriteCard',
  created() {
    this.$store.dispatch('contents/init')
    this.$store.dispatch('auth/onAuth')
  },
  computed: {
    filterContents() {
      return this.$store.getters['contents/getContents']
        .filter(content => this.$store.getters['auth/getFavorite'].includes(content.id))
    },
  }
}
</script>