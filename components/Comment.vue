<template>
  <v-row>
    <div class="comment-display">
    <v-list three-line>
      <template v-for="(comment, index) in comments">
        <v-list-item
            :key="index"
        >
          <v-list-item-avatar>
            <img :src="comment.photoUrl">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <h3>{{ comment.displayName }}</h3>{{comment.createdAt.toDate().toLocaleString()}}
            </v-list-item-title>
            <p>{{comment.comment}}</p>
          </v-list-item-content>
          <v-list-item-action-text>
            <div 
              class="comment-actions"
              v-if="comment.uid == userId"
            >
              <v-list-item-icon>
                <edit-comment　
                  :commentId="comment.id"
                  :comment="comment.comment" 
                />
                <v-btn icon @click="removeComment(comment.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-icon>
            </div>
          </v-list-item-action-text>
        </v-list-item>
        <v-divider :key="comment.id"></v-divider>
      </template>
    </v-list>
    </div>
</v-row>
</template>

<script>
import firebase from '~/plugins/firebase'
import EditComment from '~/components/EditComment.vue'
export default {
  components: {
    EditComment
  },
  data() {
    return {
      comments: this.$store.getters['contents/getComments'],
    }
  },
  methods: {
    removeComment(commentId) {
      this.$store.dispatch('contents/removeComment', {
        contentId: this.$route.params.id,
        commentId: commentId,
      })
    }
  },
  computed: {
    userId() {
      return this.$store.getters['auth/getUserId'];
    }
  }
}
</script>

<style scoped>
.comment-display {
  width: 100%;
}
.comment-actions {
  position: relative;
  left: 50%;
  bottom: 50%;
}
</style>