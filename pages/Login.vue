<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" xl="4">
        <v-card flat color="white" height="100vh" class="py-10">
          <v-row class="px-10" align="center" justify="center">
            <v-col cols="9">
              <v-img
                height="100"
                width="200"
                contain
                src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/2019-01_BrandRefresh_Old-to-New-Final.gif"
              ></v-img>

              <h1 class="font-weight-bold teal--text text--darken-4 page_title">
                Login
              </h1>
              <p class="text--secondary">
                Not registered yet?
                <span class="teal--text">Create an account.</span>
              </p>

              <v-text-field
                outlined
                dense
                label="Email"
                v-model="email"
              ></v-text-field>
              <v-text-field
                type="password"
                outlined
                dense
                label="Password"
                v-model="password"
              ></v-text-field>

              <v-row>
                <v-col>
                  <v-checkbox
                    v-model="remember"
                    style="padding: 0; margin: 0"
                    color="teal"
                    label="Remember me"
                  ></v-checkbox>
                </v-col>

                <v-col>
                  <span class="float-right teal--text text--darken-3">
                    Forgot Password?</span
                  >
                </v-col>
              </v-row>

              <v-btn color="teal " dark block @click="login()">Login</v-btn>

              <v-row class="mt-3">
                <v-col>
                  <v-divider></v-divider>
                </v-col>
                or
                <v-col>
                  <v-divider></v-divider>
                </v-col>
              </v-row>

              <v-row class="mt-3">
                <v-col class="text-center">
                  <v-card outlined>
                    <v-list-item>
                      <v-list-item-avatar width="24" height="24">
                        <v-img
                          contain
                          src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="font-weight-medium">
                          Continue with Google
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-avatar> </v-list-item-avatar>
                    </v-list-item>
                  </v-card>
                </v-col>

                <v-col class="text-center">
                  <v-card outlined>
                    <v-list-item>
                      <v-list-item-avatar width="24" height="24">
                        <v-img
                          contain
                          tile
                          src="https://www.kindpng.com/picc/m/179-1793639_facebook-logo-png-transparent-dark-blue-facebook-logo.png"
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="font-weight-medium"
                          >Continue with Facebook</v-list-item-title
                        >
                      </v-list-item-content>
                      <v-list-item-avatar></v-list-item-avatar>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>

              {{ auth_error }}

              <v-row class="text-center">
                <v-col class="font-weight-medium">
                  Not registered yet?
                  <span class="teal--text">Create an account.</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-card flat color="teal" height="100vh">asd </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      remember: '',
      auth_error: ''
    }
  },
  methods: {
    login() {
      let authLogin = {
        email: this.email,
        password: this.password
      }
      this.$auth
        .loginWith('local', { data: authLogin })
        .then(res => {
          this.auth_error = ''
          console.log(res.data)
          this.$auth.setUser(res.data)
          // this.$auth.user = res.data.data[0]
          // this.$auth.setRefreshToken('local', res.data.token.refresh_token)
          // this.$auth.$storage.setUniversal('user', res.data, true)
        })
        .catch(err => {
          console.error(err.response)
          this.auth_error = err.response.data
        })
    }
  }
}
</script>