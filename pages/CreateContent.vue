<template>
<v-app>
  <v-card width="400px" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">コンテンツ登録</h1>
    </v-card-title>
    <v-list-item v-if="$store.getters['contentsAPI/getItem'].volumeInfo != undefined">
      <v-list-item-content>
        <v-img
          :src="$store.getters['contentsAPI/getItem'].volumeInfo.imageLinks.thumbnail"
          maxWidth="100"
          maxHeight="140"
          class="white--text align-end"
        >
        </v-img>
      </v-list-item-content>
      <v-list-item-content>
        <p>タイトル：</p>
        <p>{{ $store.getters['contentsAPI/getItem'].volumeInfo.title }}</p>
        <p>著者：</p>
        <div v-if="$store.getters['contentsAPI/getItem'].volumeInfo.authors">
          <p>{{ $store.getters['contentsAPI/getItem'].volumeInfo.authors[0] }}</p>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-list-item two-line>
      <v-list-item-content>
        <v-row>
          <v-col
            v-for="tag in Object.keys(tags)"
            :key="tag.index"
          >
          <v-chip
            class="ma-2"
            color="pink"
            label
            close
            text-color="white"
            @click:close="removeTag(tag)"
          >
            <v-icon left>mdi-label</v-icon>
            {{ tag }}
          </v-chip>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-form>
        <v-text-field v-model="name"></v-text-field>
        <v-card-actions>
          <v-btn @click="search(); show()">書籍検索</v-btn>
          <modal name="modal-content" height="auto" :scrollable="true">
            <select-image></select-image>
          </modal>
        </v-card-actions>
      </v-form>
      <v-form>
        <v-text-field v-model="tagName"></v-text-field>
        <v-card-actions>
          <v-btn @click="addTag">タグを追加</v-btn>
        </v-card-actions>
      </v-form>
      <v-card-actions>
        <v-btn @click="register">登録</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</v-app>
</template>

<script>
import SelectImage from '~/components/SelectImage.vue'

export default {
  components: {
    SelectImage
  },
  data() {
    return {
      name: '',
      title: '',
      author: '',
      thumbnailUrl: '',
      tagName: '',
      tags: {}
    }
  },
  methods: {
    search() {
      this.$store.dispatch('contentsAPI/search', this.name)
    },
    show() {
      this.$modal.show('modal-content');
    },
    addTag() {
      if (this.tagName != '') {
        this.tags[this.tagName] = 0
      }
      this.tagName = ''
    },
    removeTag(tag) {
      this.$delete(this.tags, tag)
    },
    register() {
      this.title = this.$store.getters['contentsAPI/getItem'].volumeInfo.title
      this.author = this.$store.getters['contentsAPI/getItem'].volumeInfo.authors[0]
      this.thumbnailUrl = this.$store.getters['contentsAPI/getItem'].volumeInfo.imageLinks.thumbnail
      this.$store.dispatch('contents/add', {
        title: this.title,
        author: this.author,
        thumbnailUrl: this.thumbnailUrl,
        tags: this.tags,
      }),
      this.$router.push('/')
    }
  }
}
</script>