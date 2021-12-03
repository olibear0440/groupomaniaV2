<template>
  <div>
    <header>
      <div class="home">Accueil</div>
      <div @click="btnLogout()" class="logout">Deconnexion</div>
    </header>
    <section>
      <div class="myProfil">
        <div class="myProfilTitle">
          <h2>Mon profil</h2>
        </div>
        <div class="profilBloc">
          <div class="profilPicNBtn">
            <div class="profilPic">
              <img src="../assets/pic200x200.png" alt="photo-de-profil" />
            </div>
          </div>
          <div class="profilInfos">
            <p>{{ currentUser.firstname }}</p>
            <p>{{ currentUser.lastname }}</p>
            <p>{{ currentUser.email }}</p>
            <p>{{ currentUser.userRole }}</p>
          </div>
          <div class="btnForm">
            <button class="btnCreatePost" @click="btnCreateMyPost()">Creer un post</button>
          </div>
        </div>
      </div>
      <div class="allThePosts">
        <div class="postsTitle">
          <h2>Les posts</h2>
        </div>
        <div class="usersPosts" v-for="post in allPosts" :key="post.id">
          <div class="postsUsersInfos">
            <p>{{ post.usersEmail}}</p>
            <p>{{ getNow(post.postDate)}}</p>
          </div>
          <div class="postsInfos">
            <p>{{ post.postTitre }}</p>
            <p>{{ post.postDescription }}</p>
            <div>
              <img class="postsImg" :alt="post.id" :src="post.postImgUrl"/>
            </div>
            <div class="postComments" @click="btnShowComments()">commentaires</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Posts",
  mounted() {
    //console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) this.$router.push("/");
    //recuperer les infos du user
    this.$store.dispatch("getCurrentUser");
    this.$store.dispatch("getAllPosts");
    
  },



  computed: {
    ...mapState(["currentUser", "allPosts"]),
  },
  methods: {
    btnLogout() {
      this.$store.commit("btnLogout");
      this.$router.push("/");
    },
    btnCreateMyPost() {
      this.$router.push("/Mypost");
    },
    btnShowComments() {
      this.$router.push("/Comments");
    },
    getNow(){
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + 
    today.getSeconds();
    const dateTime = date+' '+time;
    return dateTime
  }
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
.myProfil {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 50%;
  max-width: 100%;
  margin-bottom: 20px;
}
.myProfilTitle {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 40px;
}
.myProfilTitle h2 {
  margin: 0;
}
.profilBloc {
  display: flex;
  height: 200px;
}
.profilPicNBtn {
  width: 30%;
}
.profilInfos {
  width: 40%;
}
.profilInfos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 0px 20px 0px 20px;
}
.profilPic {
  width: 100%;
  object-fit: cover;
}
.btnForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px 10px 5px 10px;
  position: relative;
  width: 30%;
}
.btnCreatePost {
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
.allThePosts {
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
.postsImg{
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
.postsUsersInfos, p{
  padding: 5px;
}
.postComments{
  border: 1px solid #cecece;
  border-radius: 4px;
  padding: 5px;
  margin: 5px 0px;
  cursor: pointer;
}
.postComments:hover{
  background-color: #f7f7f7;
}
</style>
