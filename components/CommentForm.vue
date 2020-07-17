<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
        </v-card-actions>
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
      },
    },
  }
</script>
