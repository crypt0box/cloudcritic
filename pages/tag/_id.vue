<template>
  <section>
    <body>
      <v-container>
        <v-row>
          {{ contents[0].name }}
        </v-row>
        <v-divider />
        <v-row style="padding-top: 3%;">
          <v-col
            v-for="content in contents"
            :key="content.id"
            cols="6"
            md="2"
          >
          <v-row justify="center">
            <nuxt-link :to="'../content/' + content.contentId">
              {{ content.contentId }}
            </nuxt-link>
          </v-row>
          <v-row justify="center">
            <v-btn 
              text
              class="like-button"
            >
              <v-icon left>mdi-thumb-up</v-icon>
              {{ content.like }}
            </v-btn>
          </v-row>
          </v-col>
        </v-row>
      </v-container>
    </body>
  </section>
</template>

<script>
export default {
  computed:{
    contents() {
      return this.$store.getters['search/getContents']
    },
  }
}
</script>

<style scoped>
.like-button {
  width: 100px;
}
</style>