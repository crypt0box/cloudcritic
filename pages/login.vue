<template>
<v-app>
  <v-card width="400px" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-account-circle"
          type="email"
          label="メール"
          v-model="email"
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="パスワード"
          @click:append="showPassword = !showPassword"
          v-model="password"
        />
        <v-card-actions>
          <v-btn class="info" @click="login">ログイン</v-btn>
        </v-card-actions>
        <p>{{ $store.getters['auth/getIdToken'] }}</p>
      </v-form>
    </v-card-text>
  </v-card>
</v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    email: "",
    password: "",
    showPassword: false,
  }),
  methods: {
    login() {
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password,
      }),
      this.$store.dispatch('auth/updateIdToken')
      this.email = "";
      this.password = "";
      this.$router.push("/todos")
    }
  }
}
</script>
