<template>
  <div>
    <div
      class="header-img"
      :style="{height: height * 0.5 + 'px'}"
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
    <div class="body-title text-center">
      <h2>人気のコンテンツ</h2>
    </div>
    <div>
      <v-container>
        <div>
          <v-carousel
            hide-delimiter-background
            cycle
            light
            height="400"
            progress-color="#006400"
            v-model="model"
          >
            <v-carousel-item
              v-for="content in contents"
              :key="content.id"
            >
              <v-sheet
                height="100%"
                color="white"
              >
                <div class="body-content">
                  <div class="contents-title text-center">
                    <h2>{{ content.title }}</h2>
                  </div>
                  <v-row
                    align="center"
                    justify="center"
                  >
                    <nuxt-link :to="'../content/' + content.id">
                    <v-img
                      :src="content.thumbnailUrl"
                      maxWidth="180"
                      maxHeight="240"
                      width="180"
                      height="240"
                    />
                    </nuxt-link>
                  </v-row>
                </div>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-container>
    </div>
    <div class="body-title text-center">
      <h2>CloudCriticとは</h2>
    </div>
    <div>
      <v-row 
        justify="center"
        v-for="card in cards"
        :key="card.id"
        class="card"
      >
        <v-card width="80%">
          <v-row justify="center">
            <v-avatar size="125">
              <v-icon>{{ card.icon }}</v-icon>
            </v-avatar>
          </v-row>
          <v-row justify="center">
            <v-card-title>
              {{ card.title }}
            </v-card-title>
          </v-row>
          <v-row justify="center">
            <v-card-text>
              {{ card.text }}
            </v-card-text>
          </v-row>
        </v-card>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    if (process.client) {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    }
    this.$store.dispatch('contents/initPopularContents')
    this.contents = this.$store.getters['contents/getContents']
  },
  destroyed () {
    if (process.client) {
      window.removeEventListener('resize', this.handleResize)
    }
  },
  data() {
    return {
      height: 0,
      innerWidth: window.innerWidth,
      contents: [],
      model: 0,
      cards: {
        first: {
          icon:'mdi-heart',
          title: 'test',
          text: 'test'
        },
        second: {
          icon:'mdi-heart',
          title: 'test2',
          text: 'test2'
        }
      }
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
  text-align: center;
  color: white;
  text-shadow: 1px 1px 10px gray;
}
.header-form {
  padding: 5%;
}
.body-title {
  padding: 5%;
  text-decoration: underline;
  text-decoration-color: rgb(219, 59, 184);
}
.body-content {
  padding-top: 10%;
}
.card {
  padding-bottom: 5%;
}
</style>