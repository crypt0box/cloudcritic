<template>
  <div>
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
  <div class="body-title">
    <h2>CloudCriticとは</h2>
  </div>
    <div style="padding-left: 5%; padding-right: 5%;">
      <v-row justify="center">
        <v-col
          v-for="card in cards"
          :key="card.id"
          cols=4
        >
          <v-card 
            width="100%"
            height="100%"
            style="padding: 2%;"
          >
            <v-row justify="center">
              <v-avatar size="80">
                <v-icon x-large>{{ card.icon }}</v-icon>
              </v-avatar>
            </v-row>
            <v-row justify="center">
              <v-card-title>
                <h3>{{ card.title }}</h3>
              </v-card-title>
            </v-row>
            <v-row justify="center">
              <v-card-text>
                {{ card.text }}
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div 
      style="padding: 3%;">
      <v-row justify="center">
          <v-btn 
            color="#FFCB00"
            @click="register"
          >
          新規登録してはじめる
          </v-btn>
      </v-row>
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
      innerWidth: window.innerWidth,
      contents: [],
      model: 0,
      cards: {
        first: {
          icon:'mdi-pencil',
          title: '簡単レビュー',
          text: '自分の感想を言語化するのを難しく感じたことはありませんか？書籍についたタグに「いいね」するだけで簡単にレビューできます。'
        },
        second: {
          icon:'mdi-cloud',
          title: 'ワードクラウド',
          text: 'タグのいいね数に応じてワードクラウドを生成。書籍の評価されているポイントが一目でわかります。'
        },
        third: {
          icon:'mdi-cog',
          title: 'シンプルなデザイン',
          text: 'シンプルで無駄のないデザインが直感的な操作を可能にします。レスポンシブ対応のため、スマホでもPCでも使えます。'
        },
      }
    }
  },
  methods: {
    handleResize () {
      this.height = window.innerHeight
    },
    register() {
      this.$router.push('/register')
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
.body-content {
  padding-top: 10%;
}
</style>