<template>
  <div>
    a
    {{ $store.getters['auth/getUserUid'] }}
  </div>
</template>

<script>
  export default {
    validate ({ params }) {
      return /^([a-zA-Z0-9]{28})$/.test(params.id)
    }
  }
</script>