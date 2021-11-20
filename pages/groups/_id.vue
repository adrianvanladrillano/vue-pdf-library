<template>
  <div v-if="groups.length != 0">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" xl="4" v-if="toggleFullscreen == false">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card class="px-5 py-5">
              <v-row>
                <v-col cols="4">
                  {{ loadGroup }}
                  <v-img :src="'http://192.168.100.77:8080/' + avatar"></v-img>

                  <input
                    type="file"
                    @change="onAvatarSelected"
                    v-if="editMode == true"
                  />
                </v-col>
                <v-col>
                  <v-row dense>
                    <v-col>
                      <h2 class="font-weight-medium" v-if="editMode == false">
                        {{ title }}
                      </h2>
                      <v-text-field
                        class="mt-5"
                        v-model="title"
                        outlined
                        dense
                        v-if="editMode == true"
                        label="Title"
                        :rules="titleRules"
                      />
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col>
                      <p class="text--secondary" v-if="editMode == false">
                        {{ description }}
                      </p>
                      <v-textarea
                        v-model="description"
                        outlined
                        dense
                        v-if="editMode == true"
                        label="Description"
                        :rules="titleRules"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-row align="center">
                <v-col cols="3">
                  <v-list-item two-line class="px-0 py-0">
                    <v-list-item-content>
                      <v-list-item-title class="title">
                        {{ group_items.length }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Total Files</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="3">
                  <v-list-item two-line class="px-0 py-0">
                    <v-list-item-content>
                      <v-list-item-title class="title"> 69 </v-list-item-title>
                      <v-list-item-subtitle>Something</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col>
                  <v-btn block color="teal" dark>Download</v-btn>
                </v-col>
              </v-row>

              <v-subheader class="px-0">Files</v-subheader>

              <v-row v-if="editMode == true">
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
                          :src="
                            'http://192.168.100.77:8080/' + data.item.avatar
                          "
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
                          :src="
                            'http://192.168.100.77:8080/' + data.item.avatar
                          "
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
                <v-col cols="4" v-for="item in group_items" :key="item.id">
                  <group-item @loadPdf="loadPdf" :id="item.id" />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    outlined
                    placeholder="Notes"
                    v-model="notes"
                  ></v-textarea>
                  <v-btn
                    color="teal"
                    text
                    class="float-right"
                    @click="editMode = !editMode"
                    v-if="editMode == false"
                  >
                    Edit
                  </v-btn>

                  <v-btn
                    color="teal"
                    text
                    depressed
                    class="float-right"
                    v-if="editMode == true"
                    @click="onUpdate()"
                  >
                    Save Changes
                  </v-btn>

                  <v-btn
                    color="error"
                    text
                    depressed
                    class="float-right"
                    @click="onCancel()"
                    v-if="editMode == true"
                  >
                    Cancel
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-form>
        </v-col>

        <v-col
          cols="12"
          :xl="toggleFullscreen == false ? '6' : '7'"
          style="background: #f5f5f5"
        >
          <v-row dense class="mt-10 px-10">
            <!-- Left -->
            <v-col cols="6" xl="4">
              <v-row>
                <v-col>
                  <v-text-field
                    type="number"
                    dense
                    v-model="pdfPage"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="title">/{{ pdfPageCount }}</h3>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" xl="4">
              <v-row dense>
                <v-col>
                  <v-btn block color="teal">
                    <v-icon color="white">mdi-minus</v-icon>
                  </v-btn>
                </v-col>

                <v-col>
                  <v-text-field dense outlined value="100%"></v-text-field>
                </v-col>

                <v-col>
                  <v-btn block color="teal">
                    <v-icon color="white">mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <!-- Right -->
            <v-col cols="12" xl="4">
              <v-row>
                <v-col>
                  <v-btn
                    class="float-right"
                    @click="toggleFullscreen = !toggleFullscreen"
                    depressed
                  >
                    <v-icon>mdi-fullscreen</v-icon>
                  </v-btn>

                  <v-btn
                    class="float-right mr-4"
                    @click="toggleFullscreen = !toggleFullscreen"
                    depressed
                  >
                    <v-icon>mdi-phone-rotate-landscape</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <v-card class="mx-10 my-5 px-5 py-5">
                <pdf
                  v-if="pdfSrc != null"
                  :src="'http://192.168.100.77:8080/' + pdfSrc"
                  @numpages="getPages"
                  :page="pdfPage * 1"
                  :text="false"
                  :key="pdfSrc"
                >
                  <template slot="loading"> loading content here... </template>
                </pdf>
              </v-card>
              <v-navigation-drawer temporary v-model="pages" right app>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="title"> Pages </v-list-item-title>
                    <v-list-item-subtitle> subtext </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-navigation-drawer>
            </v-col>
          </v-row>

          <v-row class="mx-7 pb-5">
            <v-col>
              <v-btn
                class="float-right white--text"
                block
                color="teal"
                :disabled="pdfPage == 1 ? true : false"
                @click="pdfPage--"
                >Previous Page</v-btn
              >
            </v-col>

            <v-col>
              <v-btn
                class="float-right white--text"
                block
                color="teal"
                :disabled="pdfPage == pdfPageCount ? true : false"
                @click="pdfPage++"
                >Next Page</v-btn
              >
            </v-col>

            <v-col>
              <v-btn
                dark
                class="float-right"
                block
                text
                color="teal"
                @click="pages = !pages"
                >Show Pages</v-btn
              >
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          xl="2"
          v-if="!$vuetify.breakpoint.mobile && toggleFullscreen == false"
        >
          <v-row>
            <v-col>
              <v-card>
                <v-virtual-scroll
                  height="85vh"
                  item-height="200"
                  :items="pdfPreview"
                >
                  <template v-slot:default="{ item }">
                    <div class="px-5">
                      <v-card
                        class="mx-5 my-5 text-center"
                        @click="pdfPage = item"
                        :elevation="pdfPage == item ? '10' : false"
                      >
                        <pdf
                          v-if="pdfSrc != null"
                          :src="'http://192.168.100.77:8080/' + pdfSrc"
                          :page="item"
                          :text="false"
                          :key="pdfSrc"
                        >
                        </pdf>
                      </v-card>
                      <p class="font-weight-regular text-center">
                        Page {{ item }}
                      </p>
                    </div>

                    <div v-if="item != pdfPageCount" class="px-5">
                      <v-card
                        class="mx-5 my-5"
                        @click="pdfPage = item + 1"
                        :elevation="pdfPage == item + 1 ? 10 : 0"
                      >
                        <pdf
                          :src="'http://192.168.100.77:8080/' + pdfSrc"
                          :page="item"
                          :text="false"
                          :key="pdfSrc"
                        >
                        </pdf>
                      </v-card>
                      <p class="font-weight-regular text-center">
                        Page {{ item + 1 }}
                      </p>
                    </div>

                    <div v-if="item != pdfPageCount" class="px-5">
                      <v-card
                        class="mx-5 my-5"
                        @click="pdfPage = item + 2"
                        :elevation="pdfPage == item + 2 ? '10' : false"
                      >
                        <pdf
                          :src="'http://192.168.100.77:8080/' + pdfSrc"
                          :page="item"
                          :text="false"
                          :key="pdfSrc"
                        >
                        </pdf>
                      </v-card>
                      <p class="font-weight-regular text-center">
                        Page {{ item + 2 }}
                      </p>
                    </div>
                  </template>
                </v-virtual-scroll>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

import pdf from 'pdfvuer'
import 'pdfjs-dist/build/pdf.worker.entry'

export default {
  middleware: 'auth',
  async fetch({ store }) {
    await store.dispatch('get_groups')
    await store.dispatch('get_files')
  },
  components: {
    pdf
  },
  data() {
    return {
      toggleFullscreen: false,
      editMode: false,

      pages: false,
      group_items: [],

      // Set Data
      notes: '',
      avatar: '',
      title: '',
      description: '',

      pdfSrc: null,
      pdfPageCount: 0,
      pdfPage: 1,
      pdfPreview: []
    }
  },

  computed: {
    ...mapState({
      files: state => {
        return state.files
      },
      groups: state => {
        return state.groups
      }
    }),
    loadGroup() {
      let index = this.groups.map(el => el.id).indexOf(this.$route.params.id)
      this.title = this.groups[index].title
      this.description = this.groups[index].description
      this.avatar = this.groups[index].avatar
    }
  },
  methods: {
    onUpdate() {
      if (this.$refs.form.validate()) {
        axios
          .put(
            'http://192.168.100.77:8080/api/groups/' + this.$route.params.id,
            {
              title: this.title,
              description: this.description,
              tags: this.tags,
              items: this.group_items,
              avatar: this.avatar,
              user: 'asdasd',

              notes: this.notes
            }
          )
          .then(res => {
            this.snackbar = true
            this.snackbar_text = 'Success'
            this.snackbar_desc = 'File updated successfully!'
            this.editMode = false
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
        this.avatar = response.data.filename
      })
    },
    addFile() {
      this.group_items.push(this.item)
      console.log(this.items)
    },
    getPages(evt) {
      let array = Array(evt)
      this.pdfPageCount = evt
      let arr = []

      if (evt == 1) {
        arr = [1]
      } else {
        for (let index = 1; index < evt; index++) {
          arr.push(index)
        }
      }
      this.pdfPreview = arr
    },
    loadPdf(id) {
      this.pdfSrc = null
      let index = this.files.map(el => el.id).indexOf(id)
      this.pdfSrc = this.files[index].path
    },
    onCancel() {
      let index = this.groups.map(el => el.id).indexOf(this.$route.params.id)
      this.title = this.groups[index].title
      this.description = this.groups[index].description
      this.avatar = this.groups[index].avatar

      this.group_items = []
      this.group_items.push(...this.groups[index].items)

      this.editMode = false
    }
  },
  mounted() {
    let index = this.groups.map(el => el.id).indexOf(this.$route.params.id)
    this.group_items.push(...this.groups[index].items)
  }
}
</script>
