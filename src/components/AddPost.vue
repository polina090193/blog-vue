<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Post</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="post.title"
          :rules="[(v) => !!v || 'Title is required']"
          label="Title"
          class="text-field title-field"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="post.slug"
          label="Slug"
          class="text-field slug-field"
        ></v-text-field>

        <quill-editor
          ref="myQuillEditor"
          v-model="post.description"
          class="text-editor"
        />
      </v-form>

      <v-btn class="add-submit-btn" color="primary" @click="savePost">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Post.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newPost">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";
const cyrillicToTranslit = require('cyrillic-to-translit-js');
import 'quill/dist/quill.snow.css';
import { quillEditor } from 'vue-quill-editor';

export default {
  name: "add-post",
  data() {
    return {
      post: {
        id: null,
        title: "",
        slug: "",
        description: "",
        likes: 0,
      },
      submitted: false,
    };
  },
  methods: {
    savePost() {
      var data = {
        title: this.post.title,
        description: this.post.description,
        slug: this.post.slug && this.post.slug != '' ? this.post.slug : cyrillicToTranslit().transform(this.post.title, "-").toLowerCase().replace(/[^\w\s-]/g,''),
        likes: this.post.likes,
      };

      PostDataService.create(data)
        .then((response) => {
          this.post.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newPost() {
      this.submitted = false;
      this.post = {};
    },
  },

  components: {
    quillEditor
  }
};
</script>

<style lang="scss">
.submit-form {
  width: 40%;

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
.add-submit-btn {
  margin-top: 100px;

  @media screen and (max-width: 575px) {
    margin-top: 160px;
  }
}
</style>
