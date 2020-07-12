<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <div>
          id:{{ $store.getters['auth/getUserId'] }}
          email:{{ $store.getters['auth/getUserEmail'] }}
          name:{{ $store.getters['auth/getUserName'] }}
        </div>
      </v-col>
      <v-col cols="12" md="8">
        favorite card
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    validate ({ params }) {
      return /^([a-zA-Z0-9]{28})$/.test(params.id)
    },
    created() {
      this.$store.dispatch('auth/onAuth')
    }
  }
</script>