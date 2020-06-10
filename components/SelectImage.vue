<template>
<div>
  <v-container>
    <v-row>
      <v-col
        v-for="item in $store.getters['contents/getResults']"
        :key="item.id"
      >
      <a @click="selectItem(item); hide()">
        <v-img
          v-if="item.volumeInfo.imageLinks != undefined"
          :src="item.volumeInfo.imageLinks.thumbnail"
          maxWidth="100"
          maxHeight="140"
          class="white--text align-end"
        >
        </v-img>
      </a>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
export default {
  methods: {
    selectItem(item) {
      this.$store.dispatch("contents/update", item)
    },
    hide() {
      this.$modal.hide("modal-content");
    }
  }
}
</script>