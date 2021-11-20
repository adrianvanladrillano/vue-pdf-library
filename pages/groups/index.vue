<template>
  <div>
    <v-container style="padding-left: 10vw; padding-right: 10vw">
      <v-row dense class="px-2 py-5" align="center">
        <v-col>
          <v-list-item two-line class="px-0 py-0">
            <v-list-item-content>
              <v-list-item-title>
                <h1
                  class="font-weight-bold teal--text text--darken-4 page_title"
                >
                  List of all groups
                </h1>
                <!-- <h1 class="font-weight-medium">List of all files</h1> -->
              </v-list-item-title>
              <v-list-item-subtitle class="subtitle-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="12" xl="2">
          <v-btn
            block
            color="teal"
            dark
            class="float-right"
            @click="dialogNew = true"
          >
            New Group
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row no-gutters class="px-2" align="center">
        <v-col cols="12" xl="6">
          <br />
          <v-text-field
            solo
            flat
            background-color="#F9F9FB"
            rounded
            append-icon="mdi-tune"
            prepend-inner-icon="mdi-magnify"
            style="border-radius: 20px"
            label="Search here.."
            v-model="search"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-btn class="float-right" color="teal">
            <v-icon color="white">mdi-view-grid</v-icon>
          </v-btn>
          <v-btn class="float-right" text>
            <v-icon color="teal">mdi-format-list-bulleted</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="filtered_groups.length == 0">
        <v-row align="center" justify="center" class="text-center">
          <v-col cols="4">
            <v-img
              contain
              src="https://media1.giphy.com/media/xUOwGif3BP7zFdZ2Ja/giphy.gif?cid=790b76110780ef612497093789551bcf779ee3873e795667&rid=giphy.gif&ct=s"
            ></v-img>
            <h1>No groups found. :(</h1>
            <p class="text--secondary">
              Looks like we can't find what you're looking for.
            </p>
          </v-col>
        </v-row>
      </v-row>

      <v-row>
        <v-col
          cols="6"
          xl="2"
          v-for="(item, index) in filtered_groups"
          :key="index"
          class="px-5"
          align="center"
        >
          <v-card
            @click="$router.push('/Groups/' + item.id)"
            style="
              box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
                0 15px 12px rgba(0, 0, 0, 0.22);
            "
          >
            <v-img
              height="290"
              style="overflow: hidden; position: relative; z-index: 2"
              :src="'http://192.168.100.77:8080/' + item.avatar"
            ></v-img>
          </v-card>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title> {{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>Author</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialogNew"
      width="800"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="teal">
          <v-toolbar-title>New Group</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialogNew = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text class="py-5">
          <v-list-item two-line class="px-0 text-center">
            <v-list-item-content>
              <v-list-item-title class="title">
                Create New Group
              </v-list-item-title>
              <v-list-item-subtitle>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="mt-2">
              <v-col cols="12" xl="5">
                <v-row dense>
                  <v-col>
                    <v-img
                      width="100%"
                      :src="
                        image_url == null
                          ? 'http://via.placeholder.com/500x700'
                          : 'http://192.168.100.77:8080/' + image_url
                      "
                    >
                    </v-img>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col>
                    <input type="file" @change="onAvatarSelected" />
                  </v-col>
                </v-row>
              </v-col>

              <v-col>
                <v-text-field
                  label="Group name"
                  placeholder="E.G Something here"
                  outlined
                  dense
                  :rules="nameRules"
                  v-model="title"
                ></v-text-field>

                <v-combobox
                  multiple
                  small-chips
                  outlined
                  label="Tags"
                  dense
                  v-model="tags"
                ></v-combobox>

                <v-textarea
                  label="Description"
                  placeholder="E.G Something here"
                  outlined
                  dense
                  v-model="description"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-subheader class="px-0">Files</v-subheader>

            <v-row dense>
              <v-col>
                <v-autocomplete
                  dense
                  outlined
                  :items="files"
                  return-object
                  item-text="title"
                  clearable
                  v-model="item"
                >
                  <template v-slot:selection="data">
                    <v-list-item-avatar tile>
                      <v-img
                        :src="'http://192.168.100.77:8080/' + data.item.avatar"
                      />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ data.item.title }}
                      </v-list-item-title>
                      <v-list-item-subtitle> Author </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                  <template v-slot:item="data">
                    <v-list-item-avatar tile>
                      <v-img
                        :src="'http://192.168.100.77:8080/' + data.item.avatar"
                      />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ data.item.title }}
                      </v-list-item-title>
                      <v-list-item-subtitle> Author </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-btn color="teal" dark block @click="addFile()">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" v-for="(item, index) in items" :key="index">
                <v-card>
                  <v-img
                    :src="'http://192.168.100.77:8080/' + item.avatar"
                  ></v-img>
                </v-card>
                <v-list-item two-line class="text-center">
                  <v-list-item-content>
                    <v-list-item-title> {{ item.title }} </v-list-item-title>
                    <v-list-item-subtitle>{{ item.tags }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="teal" dark @click="dialogNew = false"
            >Cancel</v-btn
          >
          <v-btn color="teal" dark @click="onSave()">Create Group</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" color="teal" right bottom class="mr-5">
      <h3>{{ snackbar_text }}</h3>
      <p>{{ snackbar_desc }}</p>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  middleware: 'auth',
  async fetch({ store }) {
    await store.dispatch('get_groups')
    await store.dispatch('get_files')
  },
  data() {
    return {
      valid: true,

      selectedFile: null,
      image_url: null,

      item: null,
      items: [],

      search: null,

      snackbar: false,
      snackbar_text: '',
      snackbar_desc: '',

      title: '',
      description: '',
      tags: [],

      dialogNew: false,
      nameRules: [v => !!v || 'Name is required']
    }
  },
  computed: {
    ...mapState({
      files: state => {
        return state.files
      },
      groups: state => {
        return state.groups
      },
      filtered_groups() {
        // return this.employees.filter(this.filterByName).filter(this.filterByAge)
        return this.groups.filter(group => {
          return (
            !this.search ||
            group.title.toLowerCase().includes(this.search.toLowerCase()) ||
            group.tags.filter(element =>
              element.toLowerCase().includes(this.search.toLowerCase())
            ).length > 0
          )
        })
      }
    })
  },
  methods: {
    onSave() {
      if (this.$refs.form.validate()) {
        // let uploads = [this.selectedFile, this.selectedPdf]
        axios
          .post('http://192.168.100.77:8080/api/groups', {
            avatar: this.image_url,
            title: this.title,
            description: this.description,
            tags: this.tags,
            items: this.items,
            user: this.title
          })
          .then(res => {
            this.snackbar = true
            this.snackbar_text = 'Success'
            this.snackbar_desc = 'Group created successfully!'
            this.$refs.form.reset()
            this.dialogNew = false

            this.$store.commit('ADD_GROUPS', res.data)
          })
          .catch(err => {
            this.snackbar = true
            console.log(err)
          })
      }
    },
    onAvatarSelected(event) {
      this.selectedFile = event.target.files[0]

      const fd = new FormData()

      fd.append('file', this.selectedFile)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      axios.post('http://192.168.100.77:8080/upload', fd).then(response => {
        this.image_url = response.data.filename
      })
    },
    addFile() {
      this.items.push(this.item)
      console.log(this.items)
    }
  }
}
</script>
