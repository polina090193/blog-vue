<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="10">
      <v-text-field v-model="title" label="Search by Title" @keyup.enter="searchTitle"></v-text-field>
    </v-col>

    <v-col cols="12" md="2">
      <v-btn small @click="searchTitle">
        Search
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Archive</v-card-title>
        <bar-loader class="bar-loader" :loading="loading"></bar-loader>
        <v-data-table v-cloak
          :headers="headers"
          :items="posts"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.title`]="{ item }">
            <a class="" @click="showSinglePost(item.id, item.slug)">{{ item.title }}</a>
          </template>
          <template v-slot:[`item.description`]="{ item }">
            <span v-html="item.description"></span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon v-if="currentUser && currentUser.roles.includes('ROLE_ADMIN')" small class="mr-2" @click="editPost(item.id, item.slug)">mdi-pencil</v-icon>
            <v-icon v-if="currentUser && currentUser.roles.includes('ROLE_ADMIN')" small @click="deletePost(item.id)">mdi-delete</v-icon>
            <p v-else>You have to get admin access <br>for editing and deleting posts</p>
          </template>
          <template slot="no-data">
            <div></div>
          </template>
        </v-data-table>
        <v-card-actions v-if="posts.length > 0">
          <v-btn v-if="currentUser && currentUser.roles.includes('ROLE_ADMIN')" small color="error" @click="removeAllPosts">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import PostDataService from "../services/PostDataService";
import { BarLoader } from '@saeris/vue-spinners'
export default {
  name: "archive-posts",
  components: {
    BarLoader
  },
  data() {
    return {
      posts: [],
      title: "",
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "description", sortable: false },
        { text: "Likes", value: "likes", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      loading: true
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    retrievePosts() {
      PostDataService.getAll()
        .then((response) => {
          this.posts = response.data.map(this.getDisplayPost);
        })
        .then(() => this.loading = false)
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrievePosts();
    },
    removeAllPosts() {
      PostDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchTitle() {
      PostDataService.findByTitle(this.title)
        .then((response) => {
          this.posts = response.data.map(this.getDisplayPost);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    showSinglePost(id, slug) {
      this.$router.push({ name: "post-details", params: { id: id, slug: slug } });
    },
    editPost(id, slug) {
      this.$router.push({ name: "post-edit", params: { id: id, slug: slug } });
    },
    deletePost(id) {
      PostDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayPost(post) {
      const maxLength = 30;
      return {
        id: post._id,
        title: post.title.length > maxLength ? this.cutStr(post.title, maxLength) : post.title,
        slug: post.slug,
        description: post.description.length > maxLength ? this.cutStr(post.description, maxLength) : post.description,
        likes: post.likes,
      };
    },
    cutStr(str, maxLength) {
      const arr = str.substr(0, maxLength).split(' ');
      arr.splice(-1, 1);
      return arr.join(' ') + '...';
    }
  },
  mounted() {
    this.retrievePosts();
  },
};
</script>
<style>
.list {
  max-width: 750px;
}

.bar-loader {
  margin: 16px;
}

[v-cloak] {
  content: 'Loading'
}
</style>