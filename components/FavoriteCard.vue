<template>
  <v-container>
    <v-row>
      <v-col
        v-for="content in contents"
        :key="content.id"
        cols="3"
      >
        <v-card
          maxWidth="150"
          maxHeight="270"
          width="150"
          height="270"
        >
          <v-row justify="center">
            <v-img
              :src="content.thumbnailUrl"
              maxWidth="150"
              maxHeight="220"
              width="150"
              height="220"
            />
          </v-row>
          <v-row ustify="center">
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
  </v-container>
</template>

<script>
export default {
  name: 'FavoriteCard',
  created() {
    this.$store.dispatch('contents/init')
    this.$store.dispatch('auth/onAuth')
  },
  computed: {
    contents() {
      return this.$store.getters['contents/getContents']
    },
  }
}
</script>