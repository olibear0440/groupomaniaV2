<template>
  <div class="createPost">
    <BackToPost />
    <div class="myPostBloc">
      <div class="myPostTitle">
        <h2>Creer un post</h2>
      </div>
      <div class="myPostMsg">
        <form
          action="/upload"
          method="POST"
          name="createPostForm"
          class="formBloc"
          enctype="multipart/form-data"
        >
          <div class="formControl">
            <input
              v-model="postTitre"
              type="text"
              placeholder="Titre"
              id="postTitre"
              name="postTitre"
              required
            />
            <textarea
              v-model="postDescription"
              placeholder="Votre message"
              id="postDescription"
              name="postDescription"
              required
            ></textarea>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .gif, .webp"
              id="postImgUrl"
              ref="myFiles"
              @change="uploadFile()"
              name="postImgUrl"
              required
            />
            <span id="createPostError"></span>
            <button
              type="button"
              @click="btnCreatePost()"
              id="confirmPost"
              name="confirmPost"
              class="confirmPost"
            >
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import BackToPost from "@/components/BackToPost.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Mypost",
  components: {
    BackToPost,
    Footer,
  },
  data: () => {
    return {
      postTitre: "",
      postDescription: "",
      file: "",
    };
  },

  methods: {
    btnLogout() {
      this.$store.commit("btnLogout");
      this.$router.push("/");
    },
    uploadFile() {
      this.file = this.$refs.myFiles.files[0];
    },

    btnCreatePost() {
      const createPostError = document.getElementById("createPostError");
      createPostError.innerHTML = "";
      if (!this.postTitre || !this.postDescription) {
        createPostError.innerHTML =
          "Veuillez renseigner au minimum un titre et un message";
        return;
      }
      this.$store.dispatch("btnCreatePost");
      this.$router.push("Posts");
    },
  },
};
</script>

<style scoped>
@import "../assets/myPost.css";
</style>
