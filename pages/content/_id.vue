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
            <v-btn class="ma-2" tile outlined color="success" @click="showFormModal">
              <v-icon center>mdi-pencil</v-icon>
            </v-btn>
            <modal name="modal-form" height="auto">
              <comment-form />
            </modal>
            <v-btn class="ma-2" tile outlined @click="countTotalLike">
              <v-icon center>mdi-thumb-up</v-icon> {{ totalLike }}
            </v-btn>
            <v-btn class="ma-2" tile outlined color="pink" @click="registerFavorite = !registerFavorite; removeFavorite()" v-if="registerFavorite">
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
          </v-row>
        </v-col>
        <v-col>
          <button @click="showTagModal">タグを編集</button>
          <modal name="modal-tag">
            <edit-tag />
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
            </v-list-item>
          </v-list-item-group>
        </v-col>
      </v-row>
      <v-divider/>
      <v-row>
        <v-col>
          wordcloud
          <wordcloud
          :data="words"
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
import { mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'
import EditTag from '~/components/EditTag.vue'
import CommentForm from '~/components/CommentForm.vue'

export default {
  components: {
    EditTag,
    CommentForm,
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
      myColors: ['#38b508', '#76ed47', '#a8e88f', '#39c900'],
      words: []
    }
  },
  created() {
    this.$store.dispatch('contents/initContent', this.$route.params.id)
    this.$store.dispatch('contents/initTags', this.$route.params.id)
    this.$store.dispatch('auth/onAuth')
  },
  mounted() {
    this.$store.getters['auth/getFavorite'].forEach(e => {
      if (e === this.$route.params.id) {
        this.registerFavorite = true
      }
    })
  },
  computed: {
    content() {
      if (this.$store.getters['contents/getContent']) {
        this.title = this.$store.getters['contents/getContent'].title
        this.author = this.$store.getters['contents/getContent'].author
        this.thumbnailUrl = this.$store.getters['contents/getContent'].thumbnailUrl
        this.totalLike = this.$store.getters['contents/getContent'].totalLike
        this.tags = this.$store.getters['contents/getTags']
        // wordcloud: :data="this.getters"を使うとエラーが出る
        // 下記にするとstateの値をwordsにコピーできるためvuexを経由しない
        this.words = JSON.parse(JSON.stringify(this.$store.getters['contents/getTags']))
      }
    },
  },
  methods: {
    showTagModal() {
      this.$modal.show('modal-tag')
    },
    showFormModal() {
      this.$modal.show('modal-form')
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
    }
  }
}
</script>