<template>
  <div>
    id:{{ $store.getters['auth/getUserId'] }}
    email:{{ $store.getters['auth/getUserEmail'] }}
    name:{{ $store.getters['auth/getUserName'] }}
  </div>
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