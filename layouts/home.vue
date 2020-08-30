<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      absolute
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link :to="'/home'">
        <v-avatar :tile="true" width="180" height="80">
          <img  
            src="~/static/cloudcritic_logo.png"
            alt="logo"
          >
        </v-avatar>
      </nuxt-link>
      <v-spacer />
      <v-btn icon :to="'/search'" nuxt>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu v-if="$store.getters['auth/getUserId']">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar size="35">
              <v-img :src="$store.getters['auth/getUserPhotoUrl']" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn 
              :to="'/users/' + $store.getters['auth/getUserId']"
              text
              nuxt
            >
            マイページ
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn 
              text
              @click="logout"
            >
            ログアウト
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-app>
      <nuxt />
    </v-app>
    <v-footer
      :fixed="fixed"
      height="40"
      absolute
      padless
      app
    >
      <v-col class="text-center">
        &copy; {{ new Date().getFullYear() }} CloudCritic
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'トップページ',
          to: '/home'
        },
        {
          icon: 'mdi-magnify',
          title: '検索',
          to: '/search'
        },
        {
          icon: 'mdi-crown',
          title: 'ランキング',
          to: '/'
        },
        {
          icon: 'mdi-account',
          title: 'マイページ',
          to: '/users/' + this.$store.getters['auth/getUserId']
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
