<template>
  <section class="container">
    <div>
      <nuxt-link :to="'users/' + $store.getters['auth/getUserUid']">user</nuxt-link>
      <nuxt-link :to="'contents/CreateContent'">作成</nuxt-link>
      <button @click="show">クリックする</button>
      <modal name="modal-content" height="80%" width="80%" :scrollable="true">
        <create-content />
      </modal>
    </div>
  </section>
</template>

<script>
import CreateContent from '~/components/SelectImage.vue'

export default {
  components: {
    CreateContent
  },
  data() {
    return {
      name: '',
    }
  },
  methods: {
    show() {
      this.$modal.show("modal-content");
    },
    hide() {
      this.$modal.hide("modal-content");
    }
  }
}
</script>