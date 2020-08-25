<template>
<div>
  <v-carousel
    hide-delimiter-background
    cycle
    light
    height="400"
    progress-color="#006400"
    v-model="model"
    @change="getTags"
  >
    <v-carousel-item
      v-for="content in contents"
      :key="content.id"
    >
      <v-sheet
        height="100%"
        color="white"
      >
        <div class="contents-title text-center">
          <h2>{{ content.title }}</h2>
        </div>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="6">
            <v-row justify="center">
              <nuxt-link :to="'content/' + content.id">
              <v-img
                :src="content.thumbnailUrl"
                maxWidth="180"
                maxHeight="240"
                width="180"
                height="240"
              />
              </nuxt-link>
            </v-row>
          </v-col>
          <v-col cols="6">
            <div class="popular-tag">
              <p>人気のタグ</p>
            </div>
            <div 
              v-for="(tag, index) in tags" 
              :key="tag.id" 
              :class="[
                index == 0 ? 'tag-name-text0' 
                : index == 1 ? 'tag-name-text1'
                : index == 2 ? 'tag-name-text2'
                : index == 3 ? 'tag-name-text3'
                : 'tag-name-text4']"
            >
              <h3>{{ tag.name }}</h3>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</div>
</template>

<script>
export default {
  data() {
    return {
      contents: [],
      model: 0,
    }
  },
  created() {
    this.$store.dispatch('contents/initPopularContents')
    this.contents = this.$store.getters['contents/getContents']
  },
  methods: {
    getTags(model) {
      this.$store.dispatch('contents/initTags', this.contents[model].id)
    }
  },
  computed: {
    tags() {
      return this.$store.getters['contents/getTags'].slice(0, 5)
    }
  }
}
</script>

<style scoped>
.contents-title {
  padding: 20px;
  color: black;
  font-size: 25px;
}
.popular-tag {
  color: black;
  font-size: 20px;
  margin-bottom: -10px;
  text-decoration: underline;
  text-decoration-color: rgb(219, 59, 184);
}
.tag-name-text0 {
  color: #00ff00;
  font-size: 32px;
}
.tag-name-text1 {
  color: #32cd32;
  font-size: 28px;
}
.tag-name-text2 {
  color: #3cb371;
  font-size: 24px;
}
.tag-name-text3 {
  color: #2e8b57;
  font-size: 18px;
}
.tag-name-text4 {
  color: #006400;
  font-size: 18px;
}
</style>