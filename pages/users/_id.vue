<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card 
        >
          <v-avatar
            class="ma-3"
            size="125"
            tile
          >
          <v-img :src="$store.getters['auth/getIconUrl']" />
          </v-avatar>
          <v-card-title>
            {{ $store.getters['auth/getUserName'] }}
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <favorite-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FavoriteCard from '~/components/FavoriteCard.vue'

  export default {
    components: {
      FavoriteCard
    },
    validate ({ params }) {
      return /^([a-zA-Z0-9]{28})$/.test(params.id)
    },
    created() {
      this.$store.dispatch('auth/onAuth')
    }
  }
</script>