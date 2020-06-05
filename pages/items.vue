<template>
  <section class="container">
    <div>
      <input v-model="name">
      <v-btn @click="search">search</v-btn>
    </div>
    <div>
      <ul class="resultItems">
        <li class="resultItem" v-for="item in $store.getters['items/getResults']" :key="item.id">
          <img :src="item.Item.mediumImageUrls[0].imageUrl" class="imgStyle">
          <dl class="dataStyle">
            <dt>
              <a :href="item.Item.itemUrl">
                Name: {{ item.Item.itemName.slice(0,20) + "..." }}
              </a>
            </dt>
            <dd class="price">
              ¥{{ item.Item.itemPrice }}
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      results: []
    }
  },
  methods: {
    search() {
      this.$store.dispatch('items/search', this.name)
    }
  }
}
</script>
