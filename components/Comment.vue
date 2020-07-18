<template>
  <v-row>
  <v-col>
    <v-list three-line>
      <template v-for="(comment, index) in comments">
        <v-list-item
            :key="index"
        >
          <v-list-item-avatar>
            <img :src="comment.avatar">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle class="text--primary subheading">{{comment.comment}}</v-list-item-subtitle>
            <v-list-item-subtitle>
              {{comment.createdAt.toDate().toLocaleString()}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="comment.id"></v-divider>
      </template>
    </v-list>
  </v-col>
</v-row>
</template>

<script>
export default {
  data() {
    return {
      comments: this.$store.getters['contents/getComments']
    }
  },
}
</script>