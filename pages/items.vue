<template>
  <section class="container">
    <div>
      <ul class="resultItems">
        <li class="resultItem" v-for="item in results" :key="item.id">
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
      results: []
    }
  },
  async asyncData({ app }) {
    const baseUrl = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?'
    const appId = 'applicationId=1061213804419554354'
    const keyword = '&keyword=カービィ' // カービィ以外認めません
    const getUrl = encodeURI(baseUrl + appId + keyword)
    const response = await app.$axios.$get(getUrl)
    return {
      results: response.Items
    }
  }
}
</script>
