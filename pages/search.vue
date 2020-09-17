<template>
  <v-app>
    <v-container>
      <v-form @submit.prevent="search">
        <v-text-field 
          v-model="name"
          placeholder="作品名または作者で検索"
          append-icon="mdi-magnify"
        >
        </v-text-field>
      </v-form>
    </v-container>
    <v-row>
      <v-col
        v-for="item in $store.getters['contentsAPI/getResults']"
        :key="item.id"
        cols="12"
      >
      <a @click="register(item)">
        <v-card outlined>
          <v-row style="padding: 1%;">
            <v-col cols="4" md="1">
              <div class="content-image">
                <v-img
                  v-if="item.volumeInfo.imageLinks != undefined"
                  :src="item.volumeInfo.imageLinks.thumbnail"
                  maxWidth="100"
                  maxHeight="140"
                  width="100"
                  height="140"
                  class="white--text align-end"
                >
                </v-img>
              </div>
            </v-col>
            <v-col cols="8" md="11">
              <div class="content-info">
                <h4>{{ item.volumeInfo.title }}</h4>
                <div v-if="item.volumeInfo.authors != undefined">
                  <p>{{ item.volumeInfo.authors[0] }}</p>
                </div>
                <div class="published-date" v-if="item.volumeInfo.publishedDate">
                  {{ item.volumeInfo.publishedDate.slice(0, 4) }}年
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </a>
      </v-col>
    </v-row>
  </v-app>
</template>


<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      name: '',
    }
  },
  methods: {
    search() {
      this.$store.dispatch('contentsAPI/search', this.name)
    },
    register(item) {
      if (item.volumeInfo.authors) {
        this.author = item.volumeInfo.authors[0]
      }
      this.$store.dispatch('contents/add', {
        title: item.volumeInfo.title || '',
        author: item.volumeInfo.authors[0] || '',
        thumbnailUrl: item.volumeInfo.imageLinks.thumbnail || '',
        id: item.id
      })
    }
  }
}
</script>

<style scoped>
.content-image{
  padding: 0%;
  padding-left: 0%;
}
.content-info{
  padding: 1%;
  padding-left: 5%;
}
.published-date {
  position: relative;
  bottom: 10%;
  width: 100%;
  text-align: end;
}
</style>