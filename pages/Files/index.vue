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
                  style
                >List of all files</h1>
                <!-- <h1 class="font-weight-medium">List of all files</h1> -->
              </v-list-item-title>
              <v-list-item-subtitle
                class="subtitle-1"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>

        <v-col cols="12" xl="2">
          <v-btn color="teal" dark block @click="dialogNew = true">
            New File
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
            label="Search here.."
            color="teal"
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

      <v-row v-if="filtered_files.length == 0">
        <v-row align="center" justify="center" class="text-center">
          <v-col cols="4">
            <v-img
              contain
              src="https://media1.giphy.com/media/xUOwGif3BP7zFdZ2Ja/giphy.gif?cid=790b76110780ef612497093789551bcf779ee3873e795667&rid=giphy.gif&ct=s"
            ></v-img>
            <h1>No files found. :(</h1>
            <p class="text--secondary">Looks like we can't find what you're looking for.</p>
          </v-col>
        </v-row>
      </v-row>

      <v-row v-if="files.length != 0">
        <v-col
          cols="6"
          xl="2"
          v-for="(item, index) in filtered_files"
          :key="index"
          class="px-5"
          align="center"
        >
          <v-card @click="$router.push('/Files/' + item.id)" elevation="0">
            <v-img
              height="290"
              style="box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px"
              :src="
                item.avatar == null
                  ? 'http://via.placeholder.com/500x700'
                  : 'http://192.168.100.77:8080/' + item.avatar
              "
            ></v-img>
          </v-card>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>
                {{
                item.tags[0] == null ? 'Tag' : item.tags[0]
                }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialogNew" width="800" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="teal">
          <v-toolbar-title>New File</v-toolbar-title>
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
              <v-list-item-title class="title">Create New File</v-list-item-title>
              <v-list-item-subtitle>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="mt-2">
              <v-col cols="12" xl="4">
                <v-row dense>
                  <v-col>
                    <v-img
                      width="100%"
                      :src="
                        image_url == null
                          ? 'http://via.placeholder.com/500x700'
                          : 'http://192.168.100.77:8080/' + image_url
                      "
                    ></v-img>
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
                  label="File name"
                  placeholder="E.G Something here"
                  outlined
                  dense
                  :rules="nameRules"
                  v-model="title"
                ></v-text-field>

                <v-combobox multiple small-chips outlined label="Tags" dense v-model="tags"></v-combobox>

                <v-textarea
                  label="Description"
                  placeholder="E.G Something here"
                  outlined
                  dense
                  v-model="description"
                ></v-textarea>

                <input type="file" @change="onPdfSelected" />

                <!-- <v-file-input
                  small-chips
                  truncate-length="15"
                  label="File"
                  outlined
                  dense
                ></v-file-input>-->
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="teal" dark @click="dialogNew = false">Cancel</v-btn>
          <v-btn color="teal" dark @click="onSave()">Create File</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" color="teal" right bottom class="mr-5">
      <v-list-item two-line class="px-0 py-0">
        <v-list-item-avatar width="64" height="64" tile>
          <v-img src="https://i.pinimg.com/originals/bd/79/67/bd79677b3c5ac10ed4c253e7501e4c4b.gif"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ snackbar_text }}</v-list-item-title>
          <v-list-item-subtitle>{{ snackbar_desc }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-row>
        <v-col cols="1"> </v-col>
        <v-col>
          <h3>{{ snackbar_text }}</h3>
          <p>{{ snackbar_desc }}</p>
          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-col>
      </v-row>-->
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  middleware: 'auth',
  async fetch({ store }) {
    await store.dispatch('get_files')
  },
  data() {
    return {
      valid: true,

      search: null,

      selectedFile: null,
      selectedPdf: null,
      image_url: null,
      pdf_url: null,

      snackbar: false,
      snackbar_text: '',
      snackbar_desc: '',

      title: '',
      description: '',
      tags: [],

      dialogNew: false,
      nameRules: [v => !!v || 'Name is required'],
      items: [
        {
          title: 'Three Month Rule',
          logo:
            'https://static-cse.canva.com/blob/142533/Red-and-Beige-Cute-Illustration-Young-Adult-Book-Cover.jpg'
        },
        {
          title: 'Memory',
          logo:
            'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1594616847'
        },
        {
          title: 'The Book Of Chaos',
          logo:
            'https://www.thebookdesigner.com/wp-content/uploads/2018/11/The-book-of-chaos.jpg'
        },
        {
          title: 'My Book Cover',
          logo: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
        },
        {
          title: 'The Good Surgeon',
          logo:
            'https://static-cse.canva.com/blob/142541/Yellow-Surgeon-Creative-Book-Cover.jpg'
        },
        {
          title: 'All The Bright Places',
          logo:
            'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1404331702l/18460392.jpg'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      files: state => {
        return state.files
      },
      host: state => {
        return state.host
      }
    }),
    filtered_files() {
      // return this.employees.filter(this.filterByName).filter(this.filterByAge)
      return this.files.filter(file => {
        return (
          !this.search ||
          file.title.toLowerCase().includes(this.search.toLowerCase()) ||
          file.tags.filter(element =>
            element.toLowerCase().includes(this.search.toLowerCase())
          ).length > 0
          // ||
          // file.description.toLowerCase().includes(this.search.toLowerCase())
          // || file.description.toLowerCase().includes(this.name.toLowerCase()) ||
          // file.tags.filter(element => element.value.includes(this.search))
          //   .length > 0

          // ID
          // &&
          // (!this.department ||
          //   employee.department
          //     .toLowerCase()
          //     .includes(this.department.toLowerCase())) &&
          // (!this.emp_status ||
          //   employee.emp_status
          //     .toLowerCase()
          //     .includes(this.emp_status.toLowerCase())) &&
          // (!this.branch ||
          //   employee.branch
          //     .toLowerCase()
          //     .includes(this.branch.toLowerCase())) &&
          // (!this.job ||
          //   employee.job.toLowerCase().includes(this.job.toLowerCase())) &&
          // (!this.type ||
          //   employee.emp_type.toLowerCase().includes(this.type.toLowerCase()))
          // )
        )
      })
    }
  },
  methods: {
    onSave() {
      if (this.$refs.form.validate()) {
        // let uploads = [this.selectedFile, this.selectedPdf]

        axios
          .post('http://' + host + ':8080/api/files', {
            avatar: this.image_url,
            title: this.title,
            description: this.description,
            tags: this.tags,
            path: this.pdf_url,
            user: this.title
          })
          .then(res => {
            this.snackbar = true
            this.snackbar_text = 'Success'
            this.snackbar_desc = 'File created successfully!'
            this.$refs.form.reset()
            this.dialogNew = false

            this.$store.commit('ADD_FILES', res.data)
          })
          .catch(err => {
            this.snackbar = true
            this.snackbar_text = 'Error'
            this.snackbar_desc = 'Please try again later!'
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
        this.pdf_url = response.data.filename
      })
    }
  },
  mounted() {}
}
</script>
