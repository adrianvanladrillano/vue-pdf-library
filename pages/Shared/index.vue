<template>
  <div>
    <v-row no-gutters>
      <v-col cols="3">
        <v-card class="py-5" style="height: 100vh">
          <v-list-item two-line class="px-7">
            <v-list-item-content>
              <v-list-item-title>
                <h2 class="font-weight-medium">Inbox</h2></v-list-item-title
              >
              <v-list-item-subtitle class="subtitle-1"
                >List of all messages.</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-text-field
            class="px-5 pt-3"
            rounded
            solo
            flat
            dense
            label="Search shared files"
            background-color="#F3F3F5"
          ></v-text-field>

          <v-list-item class="py-2" link>
            <v-list-item-avatar width="64" height="64">
              <v-img
                contain
                src="https://66.media.tumblr.com/416e3f2f9b8332a7c05fbcee73e02cf5/51fcaac23a8352c7-47/s500x750/c83731b94eadb4968864f595b282cd87c717e517.png"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content v-if="!$vuetify.breakpoint.mobile">
              <v-list-item-title class="font-weight-bold"
                >Putanginamoka</v-list-item-title
              >
              <v-list-item-subtitle class="font-weight-bold"
                >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
                voluptates quis fugiat pariatur non hic deserunt ullam at maxime
                temporibus accusamus, voluptatem rem eos dignissimos magnam
                laudantium quae quisquam reiciendis.</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-action v-if="!$vuetify.breakpoint.mobile">
              <v-btn icon> <v-icon>mdi-dots-vertical</v-icon></v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item class="py-2" link v-for="item in items">
            <v-list-item-avatar width="64" height="64">
              <v-img
                contain
                src="https://66.media.tumblr.com/416e3f2f9b8332a7c05fbcee73e02cf5/51fcaac23a8352c7-47/s500x750/c83731b94eadb4968864f595b282cd87c717e517.png"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content v-if="!$vuetify.breakpoint.mobile">
              <v-list-item-title>Putanginamoka</v-list-item-title>
              <v-list-item-subtitle
                >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
                voluptates quis fugiat pariatur non hic deserunt ullam at maxime
                temporibus accusamus, voluptatem rem eos dignissimos magnam
                laudantium quae quisquam reiciendis.</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-action v-if="!$vuetify.breakpoint.mobile">
              <v-btn icon> <v-icon>mdi-dots-vertical</v-icon></v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col style="background: white" class="px-15 py-15" cols="9">
        <v-row>
          <v-col>
            <v-list-item style="padding: 0">
              <v-list-item-content>
                <v-list-item-title>
                  <h1 class="font-weight-regular">Putanginamoka</h1>
                </v-list-item-title>
                <v-list-item-subtitle
                  >1:35 PM (6 hours ago)</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item style="padding: 0" class="mt-5">
              <v-list-item-avatar width="64" height="64">
                <v-img
                  src="https://66.media.tumblr.com/416e3f2f9b8332a7c05fbcee73e02cf5/51fcaac23a8352c7-47/s500x750/c83731b94eadb4968864f595b282cd87c717e517.png"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Something ehre..</v-list-item-title>
                <v-list-item-subtitle
                  >Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dolor voluptates qui.</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-row>
                  <v-col>
                    <v-btn icon> <v-icon>mdi-reply</v-icon></v-btn>
                  </v-col>
                  <v-col>
                    <v-btn icon> <v-icon>mdi-dots-vertical</v-icon></v-btn>
                  </v-col>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </v-col>
        </v-row>

        <v-row class="py-15">
          <v-col>
            <v-card class="px-0" flat>
              <v-card-text>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, earum ex quibusdam id architecto facere deserunt
                  quidem sapiente nisi, praesentium itaque inventore ipsa iure
                  iusto. Expedita rem sed ab alias? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Deleniti, earum ex quibusdam id
                  architecto facere deserunt quidem sapiente nisi, praesentium
                  itaque inventore ipsa iure iusto. Expedita rem sed ab alias?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, earum ex quibusdam id architecto facere deserunt
                  quidem sapiente nisi, praesentium itaque inventore ipsa iure
                  iusto. Expedita rem sed ab alias? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Deleniti, earum ex quibusdam id
                  architecto facere deserunt quidem sapiente nisi, praesentium
                  itaque inventore ipsa iure iusto. Expedita rem sed ab alias?
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, earum ex quibusdam id architecto facere deserunt
                  quidem sapiente nisi, praesentium itaque inventore ipsa iure
                  iusto. Expedita rem sed ab alidem sapiente nisi, praesentium
                  itaque inventore ipsa iure iusto. Expedita rem sed ab alias?
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-subheader class="px-0">Attachments</v-subheader>

        <v-row>
          <v-col cols="12" xl="2">
            <v-card>
              <v-img
                src="https://upload.wikimedia.org/wikipedia/en/1/1d/Twilightbook.jpg"
              ></v-img>
            </v-card>
            <v-list-item two-line class="text-center">
              <v-list-item-content>
                <v-list-item-title> Twilight </v-list-item-title>
                <v-list-item-subtitle>Stephenie Mayer</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: ['gago ka', 2, 3, 4, 5, 6, 6, 7, 8, 9]
    }
  }
}
</script>