<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <div class="comment-button">
        <v-btn
          text
          v-bind="attrs"
          v-on="on"
        >
          <h3>コメントする</h3>
        </v-btn>
      </div>
    </template>
    <v-card>
      <v-card-title class="headline">コメント</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="dialog = false; addComment()">
        <v-card-text>
          <v-textarea
              v-model="inputComment"
              :rules="commentRules"
              label="作品の好きな部分を共有しよう！"
              outlined
              auto-grow
              required
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">キャンセル</v-btn>
          <v-btn color="green darken-1" text :disabled="!valid" @click="dialog = false; addComment()">投稿</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from '~/plugins/firebase'

  export default {
    name: 'CreateForm',
    data() {
      return {
        dialog: false,
        // form入力データ
        inputComment: "",
        // バリデーション
        valid: true,
        commentRules: [
          v => !!v || 'コメントは必須項目です',
        ],
      }
    },
    methods: {
      // コメント追加
      addComment() {
        const now = new Date()
        this.$store.dispatch('contents/addComment', {
          displayName: firebase.auth().currentUser.displayName,
          uid: firebase.auth().currentUser.uid,
          comment: this.inputComment,
          createdAt: now,
          contentId: this.$route.params.id,
          photoUrl: firebase.auth().currentUser.photoURL
        })
        this.inputComment = ''
      },
    },
  }
</script>

<style scoped>
.comment-button{
  position: relative;
  left: 0;
  padding-top: 1%;
}
</style>