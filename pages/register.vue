<template>
<v-app>
  <v-card width="400px" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">新規登録</h1>
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
          <v-btn class="info" @click="register">登録</v-btn>
        </v-card-actions>
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
    register() {
      this.$store.dispatch('auth/register', {
        email: this.email,
        password: this.password,
      }),
      this.$store.dispatch('auth/updateIdToken')
      this.email = "";
      this.password = "";
      this.$router.push('items')
    }
  }
}
</script>
