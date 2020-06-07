<template>
  <section class="container">
    <div>
      <nuxt-link :to="'users/' + $store.getters['auth/getUserUid']">user</nuxt-link>
    </div>
    <div>
      <input v-model="name">
      <v-btn @click="search">search</v-btn>
    </div>
    <div>
      <v-container>
        <v-row>
          <v-col
            v-for="item in $store.getters['items/getResults']"
            :key="item.id"
          >
            <v-card>
            <v-img
              :src="item.Item.mediumImageUrls[0].imageUrl"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
