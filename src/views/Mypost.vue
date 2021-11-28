<template>
  <div>
    <header>
      <div class="home">Accueil</div>
      <div @click="btnLogout()" class="logout">Deconnexion</div>
    </header>
    <section>
      <div class="myPostBloc">
        <div class="myPostTitle">
          <h2>Creer un post</h2>
        </div>
        <div class="myPostMsg">
          <form class="formBloc" enctype="multipart/form-data">
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
                @change="previewFiles()"
                multiple
                name="postImgUrl"
                required
              />
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
    </section>
  </div>
</template>

<script>
export default {
  name: "Mypost",
  data: () => {
    return {
      postTitre: "",
      postDescription: "",
      files: "",
    };
  },

  methods: {
    btnLogout() {
      this.$store.commit("btnLogout");
      this.$router.push("/");
    },
    previewFiles() {
      this.files = this.$refs.myFiles.files[0];
      console.log(this.files);
    },
    
    btnCreatePost() {
      //console.log(this.postTitre, this.postDescription, this.files)
      this.$store.dispatch("btnCreatePost", {
        postTitre: this.postTitre,
        postDescription: this.postDescription,
        postImgUrl: this.files,
      });
    },
    
  },
};
</script>

<style scoped>
header {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 40px;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 0px 50px 0px;
  font-size: 1.5em;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}
header h1 {
  margin: 0;
}
.logout {
  cursor: pointer;
}
section {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.myPostBloc {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 50%;
  max-width: 100%;
  margin-bottom: 20px;
}
.myPostTitle {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 40px;
}
.myPostTitle h2 {
  margin: 0;
}
.myPostMsg {
  margin: 30px;
}
.formBloc {
  padding: 5px;
}
.formControl {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
input {
  border: 2px solid #f0f0f0;
  padding: 10px;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
  margin-bottom: 5px;
}
textarea {
  border: 2px solid #f0f0f0;
  height: 200px;
  padding: 10px;
  font-size: 16px;
  font-family: inherit;
  margin-bottom: 5px;
}
.confirmPost {
  background-color: #8e44ad;
  border: 2px solid #8e44ad;
  color: white;
  display: block;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
}
</style>
