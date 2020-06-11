<template>
<v-app>
  <v-card width="400px" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">コンテンツ登録</h1>
    </v-card-title>
    <v-list-item v-if="$store.getters['contents/getItem'].volumeInfo != undefined">
      <v-list-item-content>
        <v-img
          :src="$store.getters['contents/getItem'].volumeInfo.imageLinks.thumbnail"
          maxWidth="100"
          maxHeight="140"
          class="white--text align-end"
        >
        </v-img>
      </v-list-item-content>
      <v-list-item-content>
        <p>タイトル：</p>
        <p>{{ $store.getters['contents/getItem'].volumeInfo.title }}</p>
        <p>著者：</p>
        <div v-if="$store.getters['contents/getItem'].volumeInfo.authors">
          <p>{{ $store.getters['contents/getItem'].volumeInfo.authors[0] }}</p>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-list-item two-line>
      <v-list-item-content>
        <v-row>
          <v-col
            v-for="(tag, index) in tags"
            :key="tag.index"
          >
          <v-chip
            class="ma-2"
            color="pink"
            label
            close
            text-color="white"
            @click:close="removeTag(index)"
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
            <select-image />
          </modal>
        </v-card-actions>
      </v-form>
      <v-form>
        <v-text-field v-model="tagName"></v-text-field>
        <v-card-actions>
          <v-btn @click="addTag">タグを追加</v-btn>
        </v-card-actions>
      </v-form>
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
      tagName: '',
      tags: []
    }
  },
  created() {
  },
  methods: {
    search() {
      this.$store.dispatch('contents/search', this.name)
    },
    show() {
      this.$modal.show('modal-content');
    },
    addTag() {
      this.tags.push(this.tagName)
      this.tagName = ''
    },
    removeTag(index) {
      this.tags.splice(index, 1)
    }
  }
}
</script>