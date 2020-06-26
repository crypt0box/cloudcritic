<template>
  <v-app>
    <v-container>
      <v-form>
        <v-text-field v-model="tagName"></v-text-field>
        <v-btn @click="add">タグを追加</v-btn>
        <v-btn @click="register">登録</v-btn>
      </v-form>
    </v-container>
    <v-row>
      <v-col
        v-for="tag in tags"
        :key="tag.name"
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
      {{ tag.name }}
      </v-chip>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      tagName: '',
      tags: []
    }
  },
  methods: {
    add() {
      if(this.tagName != '') {
        this.tags.push({name: this.tagName, like: 0})
      }
      this.tagName = ''
    },
    removeTag(tag) {
      this.tags = this.tags.filter(n => n !== tag)
    },
    register() {
      for (let i = 0; i < this.tags.length; i++) {
        this.$store.dispatch('contents/addTag', {
          id: this.$route.params.id,
          tag: this.tags[i]
        })
      }
    },
    hide() {
      this.$modal.hide("modal-content")
    }
  }
}
</script>