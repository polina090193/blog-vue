<template>
  <div v-if="currentPost" class="edit-form py-3">
    <p class="headline">{{ currentPost.title }}</p>

    <div v-html="currentPost.description"></div>
    
    <v-form ref="form" lazy-validation>
      <v-btn @click="editPost" color="primary" small class="mr-2"> Edit </v-btn>

      <v-btn color="error" small class="mr-2" @click="deletePost">
        Delete
      </v-btn>
    </v-form>
  </div>

  <div v-else>
    <p>No such post is founded.</p>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "post",
  data() {
    return {
      currentPost: null,
      message: "",
    };
  },
  methods: {
    getPost(id) {
      PostDataService.get(id)
        .then((response) => {
          this.currentPost = response.data;
          this.currentPost.id = this.currentPost._id;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editPost() {
      this.$router.push({
        name: "post-edit",
        params: { id: this.currentPost.id, slug: this.currentPost.slug },
      });
    },

    deletePost() {
      PostDataService.delete(this.currentPost.id)
        .then(() => {
          this.$router.push({ name: "archive" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getPost(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
