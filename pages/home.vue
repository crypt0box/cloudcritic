<template>
  <div class="header-img">
    <div class="header-text">
      <h1>CloudCritic</h1><br>
      <h3>「いいね」するだけでブックレビューができるサイトです</h3>
    </div>
    <div class="header-form">
      <v-text-field
        solo
        label="search"
        append-icon="mdi-magnify"
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',
}
</script>

<style scoped>
.header-img {
  height: 300px;
  width: 100%;
  background-image: url("../static/home_image.jpg");
  background-size: cover;
}
.header-text {
  padding: 5%;
  color: white;
  text-shadow: 1px 1px 10px gray;
}
.header-form {
    padding-left: 5%;
    padding-right: 5%;
  }
@media screen and (max-width: 480px) {
  .header-img {
    height: 300px;
    width: 100%;
    background-image: url("../static/home_image.jpg");
    background-size: cover;
  }
  .header-text {
    padding: 5%;
    text-align: center;
    color: white;
    text-shadow: 1px 1px 10px gray;
  }
  .header-form {
    padding-left: 5%;
    padding-right: 5%;
  }
}
</style>