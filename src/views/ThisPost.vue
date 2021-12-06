<template>
  <div>
    <header>
      <div class="home">Accueil</div>
      <div @click="btnLogout()" class="logout">Deconnexion</div>
    </header>
    <section>
      <div class="onePost">
        <div class="postsTitle">
          <h2>Le post</h2>
        </div>
        <div class="usersPosts">
          <div class="postsUsersInfos">
            <p>{{ thisPost.usersEmail }}</p>
            <p>{{ renderDate(thisPost.postDate) }}</p>
          </div>
          <div class="postsInfos">
            <p>{{ thisPost.postTitre }}</p>
            <p>{{ thisPost.postDescription }}</p>
            <div>
              <img
                class="postsImg"
                :alt="thisPost.id"
                :src="thisPost.postImgUrl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="myCommentBloc">
        <div class="myCommentTitle">
          <h2>Ecrire un commentaire</h2>
        </div>
        <div class="myCommentMsg">
          <form action="/upload" method="POST"
            name="createPostForm"
            class="formBloc"
            enctype="multipart/form-data"
          >
            <div class="formControl">
              <textarea
                v-model="commentDescription"
                placeholder="Votre message"
                id="commentDescription"
                name="commentDescription"
                required
              ></textarea>
              <!--<input
                type="file"
                accept=".png, .jpg, .jpeg, .gif, .webp"
                id="postImgUrl"
                ref="myFiles"
                @change="uploadFile()"
                name="postImgUrl"
                required
              />-->
              <button
                type="button"
                
                id="confirmComment"
                name="confirmComment"
                class="confirmComment"
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
  name: "ThisPost",
  computed: {
    thisPost() {
      return this.$store.state.thisPost;
    },
  },
  mounted() {
    const idRoute = this.$route.params.id;
    this.$store.dispatch("getThisPost", idRoute);
  },
  methods: {
    btnLogout() {
      this.$store.commit("btnLogout");
      this.$router.push("/");
    },
    renderDate(postDate) {
      const d = new Date(postDate);
      return (d.getFullYear() + "-" + 
        ((d.getMonth()<10)? "0":"") + (d.getMonth() + 1) + "-" + 
        ((d.getDate()<10)? "0":"") + d.getDate() + " " +
        ((d.getHours()<10)? "0":"") + d.getHours() + ":" + 
        ((d.getMinutes()<10)? "0":"") + d.getMinutes());
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
.onePost {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 50%;
  max-width: 100%;
  margin-bottom: 20px;
}
.postsTitle {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 40px;
}
.postsTitle h2 {
  margin: 0;
}
.usersPosts {
  padding: 30px 40px;
}
.postsImg {
  border-radius: 5px;
}

.postsInfos {
  border-bottom: 2px solid blue;
  padding: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.postsUsersInfos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
.postsUsersInfos,
p {
  padding: 5px;
}



.myCommentBloc {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 50%;
  max-width: 100%;
  margin-bottom: 20px;
}
.myCommentTitle {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 40px;
}
.myCommentTitle h2 {
  margin: 0;
}
.myCommentMsg {
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
.confirmComment {
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
