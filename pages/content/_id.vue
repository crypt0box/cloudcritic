<template>
  <div>
    {{content}}
    <v-container class="content-detail">
      <v-row>
        <v-col>
          <v-row>
            <v-col>
                <h1>{{ title }}</h1>
              <v-img
                :src="thumbnailUrl"
                maxWidth="240px"
                class="white--text align-end"
              >
              </v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-btn class="ma-2" tile outlined color="success">
              <v-icon center>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="ma-2" tile outlined @click="countTotalLike">
              <v-icon center>mdi-thumb-up</v-icon> {{ totalLike }}
            </v-btn>
            <v-btn class="ma-2" tile outlined color="pink" @click="registerFavorite = !registerFavorite">
              <v-icon 
                center
                v-if="registerFavorite"
              >
              mdi-heart
              </v-icon>
              <v-icon 
                center
                v-else
              >
              mdi-heart-outline
              </v-icon>
            </v-btn>
          </v-row>
        </v-col>
        <v-col>
          ワードクラウド
        </v-col>
      </v-row>
      <v-divider/>
      <v-row>
        <v-col>
          コメント
        </v-col>
        <v-col>
          <v-subheader>タグ</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(tag, index) in tags"
              :key="index"
            >
            <v-list-item-content>
              {{ tag.name }}
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-thumb-up</v-icon>
            </v-list-item-icon>
            {{ tag.like }}
            </v-list-item>
          </v-list-item-group>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { firestoreAction, firestoreOptions } from 'vuexfire'
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      title: '',
      author: '',
      thumbnailUrl: '',
      tags: {},
      totalLike: 0,
      registerFavorite: false
    }
  },
  created() {
    this.$store.dispatch('contents/initContent', this.$route.params.id)
  },
  computed: {
    content() {
      if (this.$store.getters['contents/getContent']) {
        this.title = this.$store.getters['contents/getContent'].title
        this.author = this.$store.getters['contents/getContent'].author
        this.thumbnailUrl = this.$store.getters['contents/getContent'].thumbnailUrl
        this.tags = this.$store.getters['contents/getContent'].tags
        this.totalLike = this.$store.getters['contents/getContent'].totalLike
      }
    }
  },
  methods: {
    countTotalLike() {
      this.totalLike += 1
      this.$store.dispatch('contents/updateTotalLike', {
        id: this.$route.params.id,
        like: this.totalLike,
      })
    },
  }
}
</script>