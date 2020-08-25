<template>
  <div v-if="innerWidth > 480">
    <home-default />
  </div>
  <div v-else>
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
