<template>
  <v-dialog 
    scrollable 
    v-model="dialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-chip
        class="ma-2"
        color="pink"
        label
        text-color="white"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon center>mdi-pencil</v-icon>タグを編集
      </v-chip>
    </template>
    <div>
    <v-card>
      <v-card-title>タグ編集</v-card-title>
      <v-divider />
      <v-card-text>
        <v-list-item-group>
          <v-list-item
            v-for="tag in tags"
            :key="tag.index"
          >
            <v-list-item-content>
              {{ tag.name }}
            </v-list-item-content>
            <v-list-item-action>
              <v-btn 
                icon
                @click="removeTag(tag.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
        <v-form @submit.prevent="addTag">
          <v-text-field 
            v-model="tagName"
            placeholder="この作品の好きなトコロを登録しよう！"
            append-icon="mdi-pencil"
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn color="green darken-1" text @click="dialog = false">閉じる</v-btn>
      </v-card-actions>
    </v-card>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ['tags'],
  data() {
    return {
      dialog: false,
      tagName: '',
    }
  },
  methods: {
    addTag() {
      this.$store.dispatch('contents/addTag', {
        contentId: this.$route.params.id,
        tag: {
          name: this.tagName,
          like: 0,
          contentId: this.$route.params.id
        }
      })
      this.tagName = ''
    },
    removeTag(tagId) {
      this.$store.dispatch('contents/removeTag', {
        contentId: this.$route.params.id,
        tagId: tagId
      })
    }
  }
}
</script>