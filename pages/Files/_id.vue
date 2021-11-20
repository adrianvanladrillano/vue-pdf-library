<template>
  <div v-if="files.length != 0">
    <v-container fluid>
      <v-row no-gutters justify="center">
        <v-col cols="12" xl="4" v-if="toggleFullscreen == false">
          <v-form ref="form" v-model="valid" lazy-validation>
            {{ loadFile }}
            <v-card class="px-7 py-5">
              <v-row>
                <v-col cols="12" xl="4">
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
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col>
                      <div v-if="editMode == false">
                        <v-chip
                          label
                          color="teal"
                          dark
                          v-for="tag in tags"
                          :key="tag"
                          class="mr-2"
                        >
                          {{ tag }}
                        </v-chip>
                      </div>
                      <v-combobox
                        dense
                        outlined
                        v-model="tags"
                        label="Tags"
                        v-if="editMode == true"
                        chips
                        multiple
                      >
                      </v-combobox>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col>
                      <v-textarea
                        v-model="description"
                        v-if="editMode == true"
                        outlined
                        label="Description"
                      ></v-textarea>
                      <p class="text--secondary py-2" v-if="editMode == false">
                        {{ description }}
                      </p>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <input
                        type="file"
                        @change="onPdfSelected"
                        v-if="editMode == true"
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
                        {{ pdfPage }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Current Page</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="3">
                  <v-list-item two-line class="px-0 py-0">
                    <v-list-item-content>
                      <v-list-item-title class="title">
                        {{ pdfPageCount }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Total Pages</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col>
                  <v-btn block color="teal" dark>Download</v-btn>
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
          <v-row class="px-10">
            <v-col>
              <!-- <v-toolbar dense class="mt-5"> -->
              <v-row dense class="mt-10">
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
              <!-- </v-toolbar> -->
            </v-col>
          </v-row>

          <v-row :class="toggleFullscreen == true ? 'px-0' : 'px-10'">
            <v-col>
              <v-card>
                <pdf
                  :src="'http://192.168.100.77:8080/' + pdfSrc"
                  @numpages="getPages"
                  :page="pdfPage * 1"
                  :text="false"
                  :key="pdfSrc"
                >
                </pdf>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="px-10">
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
    <v-navigation-drawer
      temporary
      v-model="pages"
      right
      app
      v-if="pdfPageCount != 0"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Pages </v-list-item-title>
          <v-list-item-subtitle> List of all pages. </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-virtual-scroll height="85vh" item-height="200" :items="pdfPreview">
        <template v-slot:default="{ item }">
          <div>
            <v-card
              class="mx-5 my-5 text-center"
              @click="pdfPage = item"
              :elevation="pdfPage == item ? '10' : false"
            >
              <pdf
                :src="'http://192.168.100.77:8080/' + pdfSrc"
                :page="item"
                :text="false"
              >
              </pdf>
            </v-card>
            <p class="font-weight-regular text-center">Page {{ item }}</p>
          </div>

          <div v-if="item != pdfPageCount">
            <v-card
              class="mx-5 my-5"
              @click="pdfPage = item + 1"
              :elevation="pdfPage == item + 1 ? '10' : false"
            >
              <pdf
                :src="'http://192.168.100.77:8080/' + pdfSrc"
                :page="item"
                :text="false"
              >
              </pdf>
            </v-card>
            <p class="font-weight-regular text-center">Page {{ item + 1 }}</p>
          </div>

          <div v-if="item != pdfPageCount">
            <v-card
              class="mx-5 my-5"
              @click="pdfPage = item + 2"
              :elevation="pdfPage == item + 2 ? '10' : false"
            >
              <pdf
                :src="'http://192.168.100.77:8080/' + pdfSrc"
                :page="item"
                :text="false"
              >
              </pdf>
            </v-card>
            <p class="font-weight-regular text-center">Page {{ item + 2 }}</p>
          </div>
        </template>
      </v-virtual-scroll>
    </v-navigation-drawer>

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
import pdf from 'pdfvuer'
import 'pdfjs-dist/build/pdf.worker.entry'

import axios from 'axios'
import { mapState } from 'vuex'

export default {
  middleware: 'auth',
  async fetch({ store }) {
    await store.dispatch('get_files')
  },
  components: {
    pdf
  },
  data() {
    return {
      // controllers
      toggleFullscreen: false,

      editMode: false,

      // Set data
      title: '',
      description: '',
      avatar: '',
      pdfSrc: '',
      notes: '',
      pdfPageCount: 0,
      pdfPage: 1,
      pdfPreview: [],
      scrolledToBottom: false,

      // Snackbar
      snackbar: false,
      snackbar_text: '',
      snackbar_desc: '',

      // Images
      selectedFile: null,
      image_url: null,
      selectedPdf: null,
      pdf_url: null,

      // Validators
      valid: true,
      titleRules: [v => !!v || 'Title is required'],

      pages: false
    }
  },
  computed: {
    ...mapState({
      files: state => {
        return state.files
      }
    }),
    loadFile() {
      let index = this.files.map(el => el.id).indexOf(this.$route.params.id)
      this.title = this.files[index].title
      this.description = this.files[index].description
      this.avatar = this.files[index].avatar
      this.tags = this.files[index].tags
      this.pdfSrc = this.files[index].path
      this.notes = this.files[index].notes
    }
  },
  mounted() {
    console.log(this.$route.params.id)
    console.log(this.pdfPageCount)
  },
  methods: {
    onUpdate() {
      if (this.$refs.form.validate()) {
        axios
          .put(
            'http://192.168.100.77:8080/api/files/' + this.$route.params.id,
            {
              avatar: this.avatar,
              title: this.title,
              description: this.description,
              tags: this.tags,
              path: this.pdfSrc,
              user: this.title,
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
    getPages(evt) {
      // this.pdfPageCount = evt
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
    onCancel() {
      let index = this.files.map(el => el.id).indexOf(this.$route.params.id)
      this.title = this.files[index].title
      this.description = this.files[index].description
      this.avatar = this.files[index].avatar
      this.tags = this.files[index].tags
      this.pdfSrc = this.files[index].path
      this.notes = this.files[index].notes
      this.editMode = false
    },
    onPdfSelected(event) {
      this.selectedPdf = event.target.files[0]

      const fd = new FormData()

      fd.append('file', this.selectedPdf)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      axios.post('http://192.168.100.77:8080/upload', fd).then(response => {
        this.pdfSrc = response.data.filename
      })
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
    }
  }
}
</script>
