<template>
  <div>
    <div
      class="header-img"
      :style="{height: height * 0.7 + 'px'}"
    >
      <div class="header-text">
        <h1>CloudCritic</h1><br>
        <h3>「いいね」するだけでブックレビューができるサイトです</h3>
      </div>
      <div class="header-form">
        <v-form>
          <v-text-field
            solo
            label="search"
            append-icon="mdi-magnify"
          />
        </v-form>
      </div>
    </div>
    <div class="body-title">
      <h2>人気のコンテンツ</h2>
    </div>
    <div>
      <v-container>
        <contents-carousel />
      </v-container>
    </div>
  </div>
</template>

<script>
import ContentsCarousel from '~/components/ContentsCarousel'

export default {
  components: {
    ContentsCarousel,
  },
  created() {
    if (process.client) {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    }
  },
  destroyed () {
    if (process.client) {
      window.removeEventListener('resize', this.handleResize)
    }
  },
  data() {
    return {
      height: 0,
      innerWidth: window.innerWidth
    }
  },
  methods: {
    handleResize () {
      this.height = window.innerHeight
    }
  }
}
</script>

<style scoped>
.header-img {
  background-image: url("../static/home_image.jpg");
  background-size: cover;
}
.header-text {
  padding: 5%;
  color: white;
  text-shadow: 1px 1px 10px gray;
}
.header-form {
  padding-left: 5%;
  padding-right: 5%;
}
.body-title {
  padding: 1%;
  padding-left: 5%;
}
</style>