<template>
  <div>
    {{content}}
    <v-container class="content-detail">
      <v-row cols="12" md="6">
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
            <v-col>
              <comment-form />
              <v-btn
                class="ma-2"
                tile
                outlined 
                @click="countTotalLike"
              >
                <v-icon center>mdi-thumb-up</v-icon> {{ totalLike }}
              </v-btn>
              <v-btn
                class="ma-2"
                tile
                outlined
                color="pink"
                @click="registerFavorite = !registerFavorite; removeFavorite()"
                v-if="registerFavorite"
              >
                <v-icon 
                  center
                >
                mdi-heart
                </v-icon>
              </v-btn>
              <v-btn class="ma-2" tile outlined color="pink" @click="registerFavorite = !registerFavorite; addFavorite()" v-else>
                <v-icon 
                  center
                >
                mdi-heart-outline
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-divider v-if="innerWidth < 480" />
          <br><h3>タグ</h3>
          <edit-tag :tags="tags" />
          <v-chip
            class="ma-2"
            color="teal"
            label
            text-color="white"
            @click="showWordcloudModal"
          >
            <v-icon left>mdi-cloud</v-icon>ワードクラウド
          </v-chip>
          <modal 
            name="modal-wordcloud"
            :scrollable="true"
            :resizable="true"
            :adaptive="true"
          >
            <word-cloud />
          </modal>
          <v-list-item-group 
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
            <v-btn icon @click="searchTag(tag.name)">
              <v-icon>mdi-tag</v-icon>
            </v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-col>
      </v-row>
      <v-divider/>
      <br><h3>コメント</h3>
      <v-col cols="12">
        <comment />
      </v-col>
    </v-container>
  </div>
</template>

<script>
import { firestoreAction, firestoreOptions } from 'vuexfire'
import firebase from '~/plugins/firebase'
import EditTag from '~/components/EditTag.vue'
import CommentForm from '~/components/CommentForm.vue'
import WordCloud from '~/components/WordCloud.vue'
import Comment from '~/components/Comment.vue'

export default {
  middleware: 'authenticated',
  components: {
    EditTag,
    CommentForm,
    WordCloud,
    Comment,
  },
  data() {
    return {
      title: '',
      author: '',
      thumbnailUrl: '',
      tags: [],
      totalLike: 0,
      favorite: [],
      registerFavorite: false,
      innerWidth: window.innerWidth,
    }
  },
  created() {
    this.$store.dispatch('contents/initContent', this.$route.params.id)
    this.$store.dispatch('contents/initTags', this.$route.params.id)
    this.$store.dispatch('contents/initComments', this.$route.params.id)
    this.$store.dispatch('auth/onAuth')
  },
  mounted() {
    const favorite = this.$store.getters['auth/getFavorite']
    if (favorite) {
      favorite.forEach(e => {
        if (e === this.$route.params.id) {
          this.registerFavorite = true
        }
      })
    }
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
    showWordcloudModal() {
      this.$modal.show('modal-wordcloud')
    },
    countTotalLike() {
      this.$store.dispatch('contents/updateTotalLike', this.$route.params.id)
    },
    countLike(id) {
      this.$store.dispatch('contents/updateLike', {
        contentId: this.$route.params.id,
        tagId: id,
      })
    },
    addFavorite() {
      this.$store.dispatch('contents/addFavorite', this.$route.params.id)
    },
    removeFavorite() {
      this.$store.dispatch('contents/removeFavorite', this.$route.params.id)
    },
    searchTag(tagName) {
      this.$store.dispatch('contents/searchTag', tagName)
    }
  }
}
</script>