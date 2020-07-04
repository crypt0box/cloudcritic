<template>
  <div>
    id:{{ userId }}
    email:{{ userEmail }}
  </div>
</template>

<script>
  export default {
    validate ({ params }) {
      return /^([a-zA-Z0-9]{28})$/.test(params.id)
    },
    data() {
      return {
        userId: '',
        userEmail: '',
      }
    },
    created() {
      this.userId =  this.$store.getters['auth/getUserId']
      this.userEmail =  this.$store.getters['auth/getUserEmail']
      this.$store.dispatch('auth/onAuth')
    }
  }
</script>