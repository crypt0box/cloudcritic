<template>
  <div>
      <!--コメント入力フォーム-->
      <v-container>
        <h2>コメント追加</h2>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
              v-model="inputComment"
              :rules="commentRules"
              label="コメント"
              required
          ></v-text-field>
          <v-btn
              :disabled="!valid"
              @click="addComment"
          >
            投稿する
          </v-btn>
        </v-form>
      </v-container>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

  export default {
    name: 'CreateForm',
    data() {
      return {
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
          user: firebase.auth().currentUser.displayName,
          comment: this.inputComment,
          createdAt: now,
          contentId: this.$route.params.id,
        })
      },
    },
  }
</script>
