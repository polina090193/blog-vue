<template>
  <div class="edit-form py-3">
    <div v-if="currentPost">
      <p class="headline">Edit Post</p>

      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="currentPost.title"
          :rules="[(v) => !!v || 'Title is required']"
          label="Title"
          class="text-field title-field"
          required
        ></v-text-field>

        <v-text-field
          v-model="currentPost.slug"
          label="Slug"
          class="text-field slug-field"
        ></v-text-field>

        <quill-editor
          class="text-editor"
          ref="myQuillEditor"
          v-model="currentPost.description"
        />

        <v-divider class="my-5"></v-divider>

        <v-btn
          class="edit-btn edit-btn_upd"
          color="success"
          small
          @click="updatePost"
        >
          Update
        </v-btn>

        <v-btn
          color="error"
          small
          class="mr-2 edit-btn edit-btn_del"
          @click="deletePost"
        >
          Delete
        </v-btn>
      </v-form>

      <p class="mt-3">{{ message }}</p>
    </div>

    <div v-else>
      <bar-loader class="bar-loader" :loading="loading"></bar-loader>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";

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

    updatePublished() {
      var data = {
        id: this.currentPost.id,
        title: this.currentPost.title,
        slug: this.currentPost.slug,
        description: this.currentPost.description,
      };

      PostDataService.update(this.currentPost.id, data).catch((e) => {
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
    quillEditor,
  },
};
</script>

<style lang="scss">
.edit-form {
  width: 40%;
  margin: auto;

  @media screen and (max-width: 575px) {
    width: 90%;
  }
}
.text-field {
  width: 60%;

  @media screen and (max-width: 575px) {
    width: 100%;
  }
}
.edit-btn {
  margin-top: 100px;

  @media screen and (max-width: 575px) {
    margin-top: 160px;
  }

  &_upd {
    margin-right: 20px;
  }
}
</style>
