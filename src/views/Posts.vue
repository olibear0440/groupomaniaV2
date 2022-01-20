<template>
  <div class="postBloc">
    <Logout />
    <div class="myProfil">
      <div class="myProfilTitle">
        <h2>Mon profil</h2>
      </div>
      <div class="myProfilBloc">
        <div class="profilInfos">
          <p>{{ currentUser.firstname }}</p>
          <p>{{ currentUser.lastname }}</p>
          <p>{{ currentUser.email }}</p>
        </div>
        <div class="profilPassword">
          <button
            id="btnProfilPassword"
            v-if="mode == 'btnResetMdp'"
            @click="btnProfilPassword()"
          >
            Changer le mot de passe
          </button>
          <div class="updatePassword" v-if="mode == 'showLogResetMdp'">
            <form class="formChangeMdp" name="formChangeMdp">
              <input
                v-model="currentPassword"
                type="text"
                placeholder="Mot de passe actuel"
                id="currentPassword"
                name="currentPassword"
                required
              />
              <input
                v-model="newPassword"
                type="text"
                placeholder="Nouveau mot de passe"
                id="newPassword"
                name="newPassword"
                required
              />
            </form>
            <p id="updateMdpError"></p>
            <button class="btnChangeMdp" @click="btnChangeMdp()">
              Valider
            </button>
          </div>
        </div>
        <div class="btnForm">
          <button class="btnCreatePost" @click="btnCreateMyPost()">
            Creer un post
          </button>
        </div>
      </div>
    </div>
    <div class="allThePosts">
      <div class="postsTitle">
        <h2>Les derniers posts</h2>
      </div>
      <div class="usersPosts" v-for="post in allPosts" :key="post.id">
        <div class="postsUsersInfos">
          <p>Publié par : {{ post.usersEmail }}</p>
          <p>{{ renderDate(post.postDate) }}</p>
        </div>
        <div class="postsInfos">
          <p class="title">{{ post.postTitre }}</p>
          <p class="description">{{ post.postDescription }}</p>
          <div class="blocImg">
            <img
              class="postsImg"
              v-if="post.postImgUrl"
              :alt="post.id"
              :src="post.postImgUrl"
            />
          </div>
          <div class="postFooterInfos">
            <router-link class="linkBtnComment" :to="`/posts/${post.id}`">
              <div class="postComments">
                <i class="fa fa-commenting-o fa-lg" aria-hidden="true"></i>
                <p class="commentNbr">{{ post.comCount }}</p>
              </div>
            </router-link>
            <div class="likeIcon" @click="btnPostLike(post.id)">
              <span
                v-if="post.userLike != 1"
                class="fa fa-thumbs-o-up fa-lg"
                aria-hidden="true"
              ></span>
              <span
                v-if="post.userLike == 1"
                class="fa fa-thumbs-up fa-lg"
                aria-hidden="true"
              ></span>
              {{ post.likeCount }}
            </div>
            <div class="postDelete" v-if="currentUser.userRole == 1">
              <button class="btnDeletePost" @click="btnDeletePost(post.id)">
                Supprimer cette publication
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Logout from "@/components/Logout.vue";
export default {
  name: "Posts",
  components: {
    Logout,
  },
  data: () => {
    return {
      mode: "btnResetMdp",
      currentPassword: "",
      newPassword: "",
    };
  },
  mounted() {
    //console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) this.$router.push("/");
    //recuperer les infos du user
    this.$store.dispatch("getCurrentUser");
    this.$store.dispatch("getAllPosts");
  },
  computed: {
    ...mapState(["currentUser", "allPosts", "postLike"]),
  },

  methods: {
    btnProfilPassword() {
      this.mode = "showLogResetMdp";
    },
    btnChangeMdp() {
      const updateMdpError = document.getElementById("updateMdpError");
      updateMdpError.innerHTML = "";
      if (!this.currentPassword || !this.newPassword) {
        updateMdpError.innerHTML =
          "Le mot de passe doit contenir 8 caractères minimum, une majuscule, une majuscule, un chiffre et un symbole";
        return;
      }
      this.$store.dispatch("btnChangeMdp");
    },
    btnCreateMyPost() {
      this.$router.push("/Mypost");
    },
    btnPostLike(idPost) {
      //console.log("result de idPost dans posts.vue==>", idPost)
      this.$store.dispatch("btnPostLike", idPost);
    },
    btnDeletePost(id_post) {
      this.$store.dispatch("DeletePost", id_post);
    },
    renderDate(postDate) {
      const d = new Date(postDate);
      return (
        d.getFullYear() +
        "-" +
        (d.getMonth() < 10 ? "0" : "") +
        (d.getMonth() + 1) +
        "-" +
        (d.getDate() < 10 ? "0" : "") +
        d.getDate() +
        " " +
        (d.getHours() < 10 ? "0" : "") +
        d.getHours() +
        ":" +
        (d.getMinutes() < 10 ? "0" : "") +
        d.getMinutes()
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/posts.css";
</style>
