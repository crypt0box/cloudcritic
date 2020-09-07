<template>
  <div>
    <div>
      <wordcloud
        :data="words"
        name-key="name"
        value-key="like"
        :rotate="rotate"
        :margin="margin"
        :fontSize="fontSize"
        :color="myColors"
        :show-tooltip="false"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WordCloud',
  data() {
    return {
      dialog: false,
      rotate: {from: 0, to: 0, numOfOrientation: 0 },
      margin: {top: 50, right: 50, bottom: 50, left: 50 },
      fontSize: [20, 40],
      myColors: ['#38b508', '#76ed47', '#a8e88f', '#39c900'],
      words: JSON.parse(JSON.stringify(this.$store.getters['contents/getTags'])),
    }
  },
}
</script>

