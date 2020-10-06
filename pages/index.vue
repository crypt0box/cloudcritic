<template>
  <section>
    <body>
      <v-container>
        <v-row>
          <v-btn text>
            <v-icon left size="30">mdi-crown</v-icon>
            <h1>ランキング</h1>
          </v-btn>
        </v-row>
        <v-divider />
        <div class="content-list">
          <v-row>
            <v-col
              v-for="content in contents"
              :key="content.id"
              cols="6"
              md="2"
            >
            <v-row justify="center">
              <nuxt-link :to="'content/' + content.id">
                <v-img
                  :src="content.thumbnailUrl"
                  maxWidth="100"
                  maxHeight="140"
                  width="100"
                  height="140"
                >
                </v-img>
              </nuxt-link>
            </v-row>
            <v-row justify="center">
              <v-btn 
                text
                class="like-button"
              >
                <v-icon left>mdi-thumb-up</v-icon>
                {{ content.totalLike }}
              </v-btn>
            </v-row>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </body>
  </section>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('contents/init');
    this.$store.dispatch('auth/onAuth');
  },
  computed:{
    contents() {
      return this.$store.getters['contents/getContents'];
    },
  }
}
</script>

<style scoped>
.like-button {
  width: 100px;
}
.content-list {
  padding-top: 3%;
}
</style>