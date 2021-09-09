<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="10">
      <v-text-field
        v-model="title"
        label="Search by Title"
        @keyup.enter="searchTitle"
      ></v-text-field>
    </v-col>

    <v-col cols="12" md="2">
      <v-btn small @click="page = 1; retrieveTutorials();"> Search </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-row>
        <v-col cols="4" sm="3">
          <v-select
            v-model="pageSize"
            :items="pageSizes"
            label="Items per Page"
            @change="handlePageSizeChange"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="9">
          <v-pagination
            v-model="page"
            :length="totalPages"
            total-visible="7"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            @input="handlePageChange"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Archive</v-card-title>

        <v-data-table
          :headers="headers"
          :items="posts"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.title`]="{ item }">
            <a class="" @click="showSinglePost(item.id, item.slug)">{{
              item.title
            }}</a>
          </template>
          <template v-slot:[`item.description`]="{ item }">
            <span v-html="item.description"></span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editPost(item.id, item.slug)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deletePost(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="posts.length > 0">
          <v-btn small color="error" @click="removeAllPosts">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PostDataService from "../services/PostDataService";
export default {
  name: "archive-posts",
  data() {
    return {
      posts: [],
      title: "",
      searchTitle: "",
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "description", sortable: false },
        { text: "Likes", value: "likes", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      page: 1,
      totalPages: 0,
      pageSize: 3,

      pageSizes: [3, 6, 9],
    };
  },
  methods: {
    getRequestParams(searchTitle, page, pageSize) {
      let params = {};

      if (searchTitle) {
        params["title"] = searchTitle;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrievePosts() {
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      );

      PostDataService.getAll(params)
        .then((response) => {
          const { posts, totalPages } = response.data;
          this.posts = posts.map(this.getDisplayPost);
          this.totalPages = totalPages;
        })
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

    /* searchTitle() {
      PostDataService.findByTitle(this.title)
        .then((response) => {
          this.posts = response.data.map(this.getDisplayPost);
        })
        .catch((e) => {
          console.log(e);
        });
    }, */

    showSinglePost(id, slug) {
      this.$router.push({
        name: "post-details",
        params: { id: id, slug: slug },
      });
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
        title:
          post.title.length > maxLength
            ? this.cutStr(post.title, maxLength)
            : post.title,
        slug: post.slug,
        description:
          post.description.length > maxLength
            ? this.cutStr(post.description, maxLength)
            : post.description,
        likes: post.likes,
      };
    },

    cutStr(str, maxLength) {
      const arr = str.substr(0, maxLength).split(" ");
      arr.splice(-1, 1);
      return arr.join(" ") + "...";
    },

    handlePageChange(value) {
      this.page = value;
      this.retrievePosts();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrievePosts();
    },
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
</style>
