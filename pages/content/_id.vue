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
            <v-btn class="ma-2" tile outlined @click="goodjob">
              <v-icon center>mdi-thumb-up</v-icon> {{ totalGoodjob }}
            </v-btn>
            <v-btn class="ma-2" tile outlined color="pink">
              <v-icon center>mdi-heart</v-icon>
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
          <v-list-item
            v-for="(name, index) in tags"
            :key="index"
          >
           <v-list-item-content>
             {{ index }}
           </v-list-item-content>>
          </v-list-item>
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
      totalGoodjob: 0
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
        this.totalGoodjob = this.$store.getters['contents/getContent'].totalGoodjob
      }
    }
  },
  methods: {
    goodjob() {
      this.totalGoodjob += 1
      this.$store.dispatch('contents/updateTotalGoodjob', {
        id: this.$route.params.id,
        goodjob: this.totalGoodjob,
      })
    }
  }
}
</script>