<template>
  <div>
    <div :style="{height: height * 0.7 + 'px'}" class="header-img">
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
      <v-slide-group show-arrows>
        <v-row>
          <v-col
            v-for="content in contents"
            :key="content.id"
          >
            <v-slide-item>
              <v-img
                :src="content.thumbnailUrl"
                maxWidth="100"
                maxHeight="140"
              />
            </v-slide-item>
          </v-col>
        </v-row>
      </v-slide-group>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',
  created() {
    this.$store.dispatch('contents/init')
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
    }
  },
  computed:{
    contents() {
      return this.$store.getters['contents/getContents']
    },
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
    height: 300px;
    width: 100%;
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