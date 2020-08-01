<template>
  <div>
    <v-card
      :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
      class="mx-auto fill-width"
      max-width="400"
    >
      <v-card-title class="text-center pa-8">
        <h4 class="fill-width">プロフィールを入力</h4>
      </v-card-title>
      <v-divider> </v-divider>
      <div class="px-6 py-8">
        <div style="max-width:344px" class="mx-auto">
          <div>
            <v-text-field
              v-model="displayName"
              autofocus
              dense
              height="48px"
              outlined
              placeholder="ユーザー名"
            />
          </div>
          <div class="login-btn pb-8">
            <v-btn
              class="fill-width"
              color="#FFCB00"
              depressed
              height="48px"
              tile
              @click="register"
            >
              登録
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.fill-width {
  width: 100%;
}
</style>