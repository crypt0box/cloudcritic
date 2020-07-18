<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ma-2"
          tile
          outlined
          color="success"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon center>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">コメント投稿</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="dialog = false; addComment()">
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
            <v-btn color="green darken-1" text :disabled="!valid" @click="dialog = false; addComment()">投稿</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
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
          user: firebase.auth().currentUser.displayName,
          comment: this.inputComment,
          createdAt: now,
          contentId: this.$route.params.id,
        })
        this.inputComment = ''
      },
    },
  }
</script>
