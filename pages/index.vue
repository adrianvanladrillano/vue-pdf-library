<template>
  <div>
    <v-container class="px-5">
      <upload-files></upload-files>
      <upload-files></upload-files>

      <v-row class="px-2 py-5">
        <v-col cols="12">
          <h1 class="font-weight-medium">Hello, Adrian Van</h1>
          <p class="text--secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="6"
          xl="2"
          v-for="(item, index) in items"
          :key="index"
          class="px-10"
          align="center"
        >
          <v-card
            @click="$router.push('/Files/asd')"
            style="
              box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
                0 15px 12px rgba(0, 0, 0, 0.22);
            "
          >
            <v-img :src="item.logo"></v-img>
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
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
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
  }
}
</script>
