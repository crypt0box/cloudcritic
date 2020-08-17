<template>
  <v-slide-group
    show-arrows
  >
    <v-row>
      <v-col
        v-for="content in contents"
        :key="content.id"
      >
        <v-slide-item>
          <v-img
            :src="content.thumbnailUrl"
            maxWidth="100"
            maxHeight="140"
          />
        </v-slide-item>
      </v-col>
    </v-row>
  </v-slide-group>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('contents/init')
  },
  computed: {
    contents() {
      return this.$store.getters['contents/getContents']
    },
  },
}
</script>