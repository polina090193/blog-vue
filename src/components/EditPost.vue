<template>
  <div v-if="currentPost" class="edit-form py-3">
    <p class="headline">Edit Post</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentPost.title"
        :rules="[(v) => !!v || 'Title is required']"
        label="Title"
        required
      ></v-text-field>

      <quill-editor
          ref="myQuillEditor"
          v-model="currentPost.description"
        />

      <v-divider class="my-5"></v-divider>

      <v-btn color="success" small @click="updatePost">
        Update
      </v-btn>

      <v-btn color="error" small class="mr-2" @click="deletePost">
        Delete
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Post...</p>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";
import 'quill/dist/quill.snow.css';
import { quillEditor } from 'vue-quill-editor';

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

    updatePublished(status) {
      var data = {
        id: this.currentPost.id,
        title: this.currentPost.title,
        description: this.currentPost.description,
        published: status,
      };

      PostDataService.update(this.currentPost.id, data)
        .then(() => {
          this.currentPost.published = status;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePost() {
      PostDataService.update(this.currentPost.id, this.currentPost)
        .then(() => {
          this.message = "The Post was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
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

  components: {
    quillEditor
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
