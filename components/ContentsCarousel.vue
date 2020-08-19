<template>
<div>
  <v-carousel
    height="400"
    hide-delimiter-background
    v-model="model"
    @change="getTags"
  >
    <v-carousel-item
      v-for="content in contents"
      :key="content.id"
    >
      <v-sheet
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-col cols="6">
            <v-img
              :src="content.thumbnailUrl"
              maxWidth="100"
              maxHeight="140"
            />
          </v-col>
          <v-col cols="6">
            <wordcloud
              :data="tags"
              name-key="name"
              value-key="like"
              :color="myColors"
              :show-tooltip="false"
            />
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
      tags: [],
      model: 0,
      myColors: ['#38b508', '#76ed47', '#a8e88f', '#39c900'],
    }
  },
  created() {
    this.$store.dispatch('contents/initPopularContents')
    this.contents = this.$store.getters['contents/getContents']
  },
  methods: {
    getTags(model) {
      this.$store.dispatch('contents/initTags', this.contents[model].id)
      this.tags = JSON.parse(JSON.stringify(this.$store.getters['contents/getTags']))
    }
  },
}
</script>