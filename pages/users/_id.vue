<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="mx-auto">
          <div class="px-6 py-8">
            <div class="mx-auto">
              <v-row justify="center">
                <v-avatar
                  size="60"
                >
                <v-img
                  v-if="$store.getters['auth/getUserPhotoUrl']"
                  :src="$store.getters['auth/getUserPhotoUrl']"
                />
                </v-avatar>
                <v-card-text class="text-center">
                  <h3>{{ $store.getters['auth/getUserName'] }}</h3>
                </v-card-text>
              </v-row>
              <v-card-actions>
                <edit-profile />
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <h2>お気に入り</h2>
        <v-divider />
        <favorite-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FavoriteCard from '~/components/FavoriteCard.vue'
import EditProfile from '~/components/EditProfile.vue'

  export default {
    middleware: 'authenticated',
    components: {
      FavoriteCard,
      EditProfile
    },
    validate ({ params }) {
      return /^([a-zA-Z0-9]{28})$/.test(params.id);
    },
    created() {
      this.$store.dispatch('auth/onAuth');
    }
  }
</script>