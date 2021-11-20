<template>
  <div>
    <v-container
      fluid
      :style="
        !$vuetify.breakpoint.mobile
          ? 'padding-left: 30vw; padding-right: 30vw'
          : ''
      "
    >
      <v-row dense class="pt-5" align="center">
        <v-col>
          <v-list-item two-line class="px-0 py-0">
            <v-list-item-content>
              <v-list-item-title>
                <h1
                  class="
                    font-weight-medium
                    teal--text
                    text--darken-4
                    page_title
                  "
                >
                  Account
                </h1>
                <!-- <h1 class="font-weight-medium">List of all files</h1> -->
              </v-list-item-title>
              <v-list-item-subtitle class="subtitle-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="px-7">
            <v-row dense>
              <v-col>
                <v-list-item two-line class="px-0">
                  <v-list-item-avatar width="64" height="64">
                    <v-img
                      src="https://p.favim.com/orig/2018/07/10/gif-jennie-blackpink-Favim.com-6007582.gif"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      <h3 class="font-weight-medium teal--text text--darken-4">
                        Adrian Van ladrillano
                      </h3>
                      <!-- <h1 class="font-weight-medium">List of all files</h1> -->
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      adrianvanladrillano@gmail.com
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn color="teal" dark>Edit Account</v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-col>
            </v-row>
            <v-divider></v-divider>

            <v-row dense class="mt-5">
              <v-col>
                <v-row>
                  <v-col cols="12" xl="6">
                    <v-text-field
                      outlined
                      dense
                      label="Display name"
                      value="Adrian Van Ladrillano"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" xl="6">
                    <v-text-field
                      outlined
                      dense
                      label="Email"
                      value="adrianvanladrillano@gmail.com"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="my-0">
                  <v-col cols="12" xl="6">
                    <v-text-field
                      outlined
                      type="password"
                      dense
                      label="Password"
                      value="asdasdasds"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" xl="6">
                    <v-text-field
                      outlined
                      dense
                      label="Display name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-list-item two-line class="px-0">
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium"
                  >Linked Account</v-list-item-title
                >
                <v-list-item-subtitle
                  >Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="px-0">
              <v-list-item-avatar>
                <v-img
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  >adrianvanladrillano@gmail.com</v-list-item-title
                >
                <v-list-item-subtitle>via OAuth2</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn outlined text color="teal" style="text-transform: none"
                  >Connect</v-btn
                >
              </v-list-item-action>
            </v-list-item>

            <v-list-item two-line class="px-0 mt-2">
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium"
                  >Delete Account</v-list-item-title
                >
                <v-list-item-subtitle
                  >Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-action>
                <span class="grey--text font-weight-medium"
                  >Delete Account</span
                >
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="teal" dark style="text-transform: none"
                >Save Changes</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {}
  }
}
</script>