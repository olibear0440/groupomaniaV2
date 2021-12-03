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
            <p>{{ usersEmail }}</p>
            <p>{{ getNow(postDate) }}</p>
          </div>
          <div class="postsInfos">
            <p>{{ postTitre }}</p>
            <p>{{ postDescription }}</p>
            <div>
              <img class="postsImg" :alt="id" :src="postImgUrl" />
            </div>
            <div class="postComments" @click="btnShowComments()">
              commentaires
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Comments",
  mounted() {
    this.$store.dispatch("getOnePost");
  },
  methods: {
    btnLogout() {
      this.$store.commit("btnLogout");
      this.$router.push("/");
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
section {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logout {
  cursor: pointer;
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
</style>
