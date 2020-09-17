<template>
  <div>
    <div
      class="header-img"
    >
      <div class="header-text">
        <h1>CloudCritic</h1><br>
        <h3>「いいね」するだけでブックレビューができるサイトです</h3>
      </div>
      <div class="header-form">
        <v-form @submit.prevent="search">
          <v-text-field
            solo
            label="search"
            placeholder="作品名または著者名で検索"
            append-icon="mdi-magnify"
            v-model="name"
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
        <v-card width="80%" style="padding: 2%;">
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
      </v-row>
    </div>
    <div 
      style="padding: 3%;">
      <v-row justify="center">
          <v-btn
            large
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
export default {
  created() {
    this.$store.dispatch('contents/initPopularContents')
    this.contents = this.$store.getters['contents/getContents']
  },
  data() {
    return {
      innerWidth: window.innerWidth,
      contents: [],
      model: 0,
      name: '',
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
    register() {
      this.$router.push('/register');
    },
    search() {
      this.$store.dispatch('contentsAPI/search', this.name);
      this.$router.push('/search');
    },
  }
}
</script>

<style scoped>
.header-img {
  height: 350px;
  background-image: url("../static/home_image.jpg");
  background-size: cover;
}
.header-text {
  padding-top: 5%;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 10px gray;
}
.header-form {
  padding: 5%;
  padding-top: 10%;
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