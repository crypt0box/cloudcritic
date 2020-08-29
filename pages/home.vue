<template>
  <div 
    class="top-page-content"
    v-if="innerWidth > 480"
  >
    <home-default />
  </div>
  <div
  class="top-page-content"
    v-else
  >
    <home-small />
  </div>
</template>

<script>
import HomeDefault from '~/components/HomeDefault'
import HomeSmall from '~/components/HomeSmall'

export default {
  layout: 'home',
  components: {
    HomeDefault,
    HomeSmall
  },
  data() {
    return {
      innerWidth: window.innerWidth
    }
  },
}
</script>

<style scoped>
.top-page-content {
  padding-top: 55px;
  padding-bottom: 55px;
}
</style>