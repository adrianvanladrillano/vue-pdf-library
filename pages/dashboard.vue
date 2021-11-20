<template>
  <div>
    <v-container style="padding-left: 10vw; padding-right: 10vw">
      <v-row class="mt-10">
        <v-col cols="12" xl="8">
          <v-card class="px-5" flat>
            <v-row>
              <v-col cols="6" xl="4">
                <v-img
                  src="https://i.pinimg.com/originals/bd/79/67/bd79677b3c5ac10ed4c253e7501e4c4b.gif"
                ></v-img>
              </v-col>
              <v-col cols="12" xl="8">
                <v-list-item two-line class="px-0 py-0">
                  <v-list-item-content>
                    <v-list-item-subtitle class="subtitle-1">Goodafternoon,</v-list-item-subtitle>
                    <v-list-item-title>
                      <h1 class="font-weight-bold teal--text text--darken-4 page_title">Adrian Van</h1>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <p class="text--secondary">
                  {{ $auth.user }}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus tempore quia magni facere eius doloribus voluptates
                  porro sequi nostrum et! Maxime impedit praesentium dolorum,
                  totam voluptatibus a labore incidunt laborum?
                </p>
                <v-btn class="mt-10 float-right" color="teal" dark depressed>View Updates</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" xl="4">
          <v-row>
            <v-col>
              <v-card class="px-5 py-5" color="teal" dark style="border-radius: 12px">
                <v-list-item two-line>
                  <v-list-item-avatar>
                    <v-icon x-large>mdi-clock</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="title">Today is Sunday, 13 June 2021</v-list-item-title>
                    <v-list-item-subtitle class="subtitle-1">Create something new</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card class="px-5 py-5" color="white" style="border-radius: 12px" outlined>
                <v-icon color="teal" class="text-center">mdi-format-quote-open</v-icon>
                <p
                  class="black--text"
                  style="
                    font-family: 'Times New Roman', Times, serif;
                    font-size: 1.5em;
                  "
                >{{ quote }}”</p>

                <span class="teal--text font-weight-medium">{{ author }}</span>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3 class="text--secondary">Recently added</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="6"
          xl="2"
          v-for="(item, index) in files"
          :key="index"
          class="px-5"
          align="center"
        >
          <v-card
            @click="$router.push('/Files/' + item.id)"
            style="
              box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
                0 15px 12px rgba(0, 0, 0, 0.22);
            "
          >
            <v-img :src="'http://192.168.100.77:8080/' + item.avatar"></v-img>
          </v-card>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.tags[0] }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3 class="text--secondary">Groups</h3>
        </v-col>
      </v-row>

      <v-row v-for="(item, index) in groups" :key="index">
        <v-col cols="12" xl="4">
          <v-card
            @click="$router.push('/Groups/' + item.id)"
            style="
              box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
                0 15px 12px rgba(0, 0, 0, 0.22);
              border-radius: 12px;
            "
          >
            <v-row class="px-3">
              <v-col cols="4">
                <v-img
                  style="width: 100%; border-radius: 12px"
                  :src="'http://192.168.100.77:8080/' + item.avatar"
                ></v-img>
              </v-col>

              <v-col cols="8" style="padding: 0">
                <v-card height="100%" flat>
                  <v-card-title>{{ item.title }}</v-card-title>
                  <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  middleware: 'auth',
  async fetch({ store }) {
    await store.dispatch('get_groups')
    await store.dispatch('get_files')
  },
  data() {
    return {
      quote: ''
    }
  },
  mounted() {
    axios
      .get('https://type.fit/api/quotes')
      .then(res => {
        let randomizer = Math.floor(Math.random() * res.data.length)
        console.log(randomizer)

        this.quote = res.data[randomizer].text
        this.author = res.data[randomizer].author
      })
      .catch(err => {
        console.error(err)
      })
  },
  computed: {
    ...mapState({
      files: state => {
        return state.files
      },
      groups: state => {
        return state.groups
      }
    })
  }
}
</script>
