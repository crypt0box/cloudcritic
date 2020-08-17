<template>
  <div>
    <div
      class="header-img"
      :style="{height: height * 0.7 + 'px'}"
      v-if="innerWidth > 480"
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
    <div
      class="header-img"
      :style="{height: height * 0.4 + 'px'}"
      v-else
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
    <div>
      <h2>人気のコンテンツ</h2>
      <contents-slider />
    </div>
  </div>
</template>

<script>
import ContentsSlider from '~/components/ContentsSlider'

export default {
  layout: 'home',
  components: {
    ContentsSlider,
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
@media screen and (max-width: 480px) {
  .header-img {
    background-image: url("../static/home_image.jpg");
    background-size: cover;
  }
  .header-text {
    padding: 5%;
    padding-top: 2%;
    text-align: center;
    color: white;
    text-shadow: 1px 1px 10px gray;
  }
  .header-form {
    padding: 5%;
  }
}
</style>