<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-message-text</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">コメント編集</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="dialog = false; editComment()">
        <v-card-text>
            <v-text-field
                v-model="inputComment"
                :rules="commentRules"
                label="コメント"
                required
            ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">キャンセル</v-btn>
          <v-btn color="green darken-1" text :disabled="!valid" @click="dialog = false; editComment()">投稿</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditComment',
  props: ['commentId'],
  data() {
    return {
      dialog: false,
      // form入力データ
      inputComment: '',
      // バリデーション
      valid: true,
      commentRules: [
        v => !!v || 'コメントは必須項目です',
      ],
    }
  },
  methods: {
    // コメント追加
    editComment() {
      const now = new Date()
      this.$store.dispatch('contents/editComment', {
        commentId: this.commentId,
        comment: this.inputComment,
        createdAt: now,
        contentId: this.$route.params.id,
      })
      this.inputComment = ''
    },
  },
}
</script>
