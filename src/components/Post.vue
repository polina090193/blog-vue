<template>
  <div class="single py-3">
    <div v-if="currentPost">
      <p class="headline">{{ currentPost.title }}</p>

      <div v-html="currentPost.description"></div>

      <v-form ref="form" class="post-btns" lazy-validation>
        <v-btn
          v-if="currentUser && currentUser.roles.includes('ROLE_ADMIN')"
          @click="editPost"
          color="primary"
          small
          class="mr-2"
        >
          Edit
        </v-btn>

        <v-btn
          v-if="currentUser"
          @click="like"
          color="primary"
          small
          class="mr-2"
          v-bind:class="{ liked: userWasLiked }"
        >
          Like {{ currentPost.likes }}</v-btn
        >
        <div v-else class="likes">
          <v-btn color="primary" small class="mr-2" disabled>
            You have to register for post liking</v-btn
          >

          {{ currentPost.likes }} likes
        </div>

        <v-btn
          v-if="currentUser && currentUser.roles.includes('ROLE_ADMIN')"
          color="error"
          small
          class="mr-2"
          @click="deletePost"
        >
          Delete
        </v-btn>
      </v-form>
    </div>

    <div v-else class="edit-form py-3">
      <bar-loader class="bar-loader"></bar-loader>
    </div>
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
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    userID() {
      return this.currentUser.id;
    },
    userWasLiked() {
      return this.currentPost.liked.includes(this.userID);
    },
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

    like() {

      let likes = this.userWasLiked
          ? this.currentPost.likes - 1
          : this.currentPost.likes + 1,

          liked = this.currentPost.liked;

      if (!this.userWasLiked) {
        liked.push(this.userID);
      } else {
        let userIndexInLiked = liked.indexOf(this.userID);
        liked.splice(userIndexInLiked, 1);
      }

      let data = {
        likes: likes,
        liked: liked
      };

      PostDataService.update(this.currentPost.id, data).catch((e) => {
        console.log(e);
      });
      this.currentPost.likes = data.likes;
    },
  },
  mounted() {
    this.message = "";
    this.getPost(this.$route.params.id);
  },
};
</script>

<style lang="scss">
p.headline {
  margin-bottom: 1rem;
}
img {
  width: 100%;
  height: 100%;
}
.single {
  width: 40%;
  margin: auto;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
}
.post-btns {
  margin-top: 1rem;
}

.v-application .v-btn.liked {
  background-color: #ff5252 !important;
}
</style>
