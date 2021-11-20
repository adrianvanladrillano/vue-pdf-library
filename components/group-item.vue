<template>
  <div v-if="files.length != 0">
    <v-img
      :src="'http://192.168.100.77:8080/' + avatar"
      @click="$emit('loadPdf', id)"
    ></v-img>
    <p>{{ title }}{{ loadFile }}</p>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: ['id'],
  async fetch({ store }) {
    await store.dispatch('get_groups')
    await store.dispatch('get_files')
  },
  data() {
    return {
      title: ''
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
    loadFile() {
      let index = this.files.map(el => el.id).indexOf(this.id)
      this.title = this.files[index].title
      this.description = this.files[index].description
      this.avatar = this.files[index].avatar
    }
  }
}
</script>