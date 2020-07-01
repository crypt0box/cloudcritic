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
          <button @click="show">タグを編集</button>
          <modal name="modal-content" height="80%" width="80%">
            <edit-tag />
          </modal>
          <v-list-item-group 
            color="primary"
          >
            <v-list-item
              v-for="tag in tags"
              :key="tag.index"
              @click="countLike(tag.id); countTotalLike()"
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
      <v-divider/>
      <v-row>
        <v-col>
          wordcloud
          <wordcloud
          :data="defaultWords"
          name-key="name"
          value-key="like"
          :color="myColors"
          :show-tooltip="false"
        />
        </v-col>
        <v-col>
          コメント
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { firestoreAction, firestoreOptions } from 'vuexfire'
import firebase from '~/plugins/firebase'
import EditTag from '~/components/EditTag.vue'

export default {
  components: {
    EditTag
  },
  data() {
    return {
      title: '',
      author: '',
      thumbnailUrl: '',
      tags: [],
      totalLike: 0,
      registerFavorite: false,
      myColors: ['#38b508', '#76ed47', '#a8e88f', '#39c900'],
      defaultWords: []
    }
  },
  created() {
    this.$store.dispatch('contents/initContent', this.$route.params.id)
    this.$store.dispatch('contents/initTags', this.$route.params.id)
  },
  computed: {
    content() {
      if (this.$store.getters['contents/getContent']) {
        this.title = this.$store.getters['contents/getContent'].title
        this.author = this.$store.getters['contents/getContent'].author
        this.thumbnailUrl = this.$store.getters['contents/getContent'].thumbnailUrl
        this.totalLike = this.$store.getters['contents/getContent'].totalLike
        this.tags = this.$store.getters['contents/getTags']
      }
    },
  },
  methods: {
    show() {
      this.$modal.show('modal-content')
    },
    countTotalLike() {
      this.totalLike += 1
      this.$store.dispatch('contents/updateTotalLike', {
        id: this.$route.params.id,
        like: this.totalLike,
      })
    },
    countLike(id) {
      this.$store.dispatch('contents/updateLike', {
        contentId: this.$route.params.id,
        tagId: id,
      })
    },
  }
}
</script>