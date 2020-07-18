<template>
  <div>
  {{ initWords }}
  <wordcloud
    :data="words"
    name-key="name"
    value-key="like"
    :color="myColors"
    :show-tooltip="false"
  />
  </div>
</template>

<script>
export default {
  name: 'WordCloud',
  data() {
    return {
      dialog: false,
      myColors: ['#38b508', '#76ed47', '#a8e88f', '#39c900'],
      words: [],
    }
  },
  computed: {
    initWords() {
      this.words = JSON.parse(JSON.stringify(this.$store.getters['contents/getTags']))
    }
  }
}
</script>
