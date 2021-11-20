<template>
  <v-app dark>
    <v-app-bar app color="white" elevation="1" v-if="$auth.loggedIn == true">
      <v-toolbar-title v-if="!$vuetify.breakpoint.mobile">
        <v-img
          height="50"
          width="120"
          contain
          src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/2019-01_BrandRefresh_Old-to-New-Final.gif"
        ></v-img>
      </v-toolbar-title>
      <v-spacer v-if="!$vuetify.breakpoint.mobile"></v-spacer>
      <v-toolbar-title v-if="!$vuetify.breakpoint.mobile">
        <v-btn
          v-for="(item, i) in items"
          text
          :key="i"
          :to="item.to"
          color="white"
          class="mx-2"
        >
          <v-icon color="grey" left>{{ item.icon }}</v-icon>
          <span
            class="font-weight-medium grey--text"
            style="text-transform: none; opacity: 1"
            >{{ item.title }}</span
          >
        </v-btn>
      </v-toolbar-title>
      <v-toolbar-title v-if="$vuetify.breakpoint.mobile">
        <v-img
          height="50"
          width="120"
          src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/2019-01_BrandRefresh_Old-to-New-Final.gif"
        ></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="2"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-avatar color="primary" v-bind="attrs" v-on="on">
            <v-img
              src="https://i.pinimg.com/originals/4c/97/c9/4c97c9d3589910b4ffb52369f6e791db.jpg"
            ></v-img>
          </v-avatar>
        </template>

        <v-card width="300">
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title> {{ $auth.user.data.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ $auth.user.data.email }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link>
            <v-list-item-title>Settings</v-list-item-title>
            <v-list-item-action>
              <v-btn icon> <v-icon color="teal">mdi-plus</v-icon></v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item link @click="logout()">
            <v-list-item-title>Sign-out</v-list-item-title>
            <v-list-item-action>
              <v-btn icon> <v-icon color="teal">mdi-plus</v-icon></v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main style="background: #fff">
      <nuxt />
    </v-main>

    <v-navigation-drawer v-model="sidebar" fixed v-if="$route.name != 'Login'">
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer
      color="white"
      app
      v-if="$vuetify.breakpoint.mobile && $route.name != 'Login'"
    >
      <v-bottom-navigation grow style="box-shadow: none">
        <v-btn
          value="recent"
          v-for="(item, i) in items"
          active-class="wew"
          :key="i"
          :to="item.to"
          router
        >
          <span class="font-weight-regular">{{ item.title }}</span>
          <v-icon color="teal">{{ item.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sidebar: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/Dashboard'
        },
        {
          icon: 'mdi-book-open',
          title: 'Files',
          to: '/Files'
        },
        {
          icon: 'mdi-folder',
          title: 'Groups',
          to: '/Groups'
        },
        {
          icon: 'mdi-account',
          title: 'Account',
          to: '/Account'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  mounted() {
    console.log(this.$route.name)
  },
  methods: {
    logout() {
      this.$auth.setUser('')
      this.$auth.$storage.removeUniversal('user')
      this.$auth.logout()
      this.$router.push('/')
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.page_title {
  font-family: 'Playfair Display', serif;
  font-size: 2.2em;
}
</style>