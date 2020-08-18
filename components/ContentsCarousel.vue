<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="content in contents"
      :key="content.id"
    >
      <v-sheet
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-img
            :src="content.thumbnailUrl"
            maxWidth="100"
            maxHeight="140"
          />
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
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