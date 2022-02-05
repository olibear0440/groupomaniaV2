<template>
  <div class="comment">
    <div class="commentBloc">
      <BackToPost />
      <div class="onePost">
        <div class="postsTitle">
          <h2>Commenter cette publication</h2>
        </div>
        <div class="usersPosts">
          <div class="postsUsersInfos">
            <p>posté par : {{ thisPost.usersEmail }}</p>
            <p>{{ renderDate(thisPost.postDate) }}</p>
          </div>
          <div class="thisPostsInfos">
            <p class="title">{{ thisPost.postTitre }}</p>
            <p class="description">{{ thisPost.postDescription }}</p>
            <div class="blocImg">
              <img
                crossorigin
                class="postsImg"
                v-if="thisPost.postImgUrl"
                :alt="thisPost.postTitre"
                :src="thisPost.postImgUrl"
              />
            </div>
          </div>
          <div class="thisPostCommentsNbr">
            <i class="fa fa-commenting-o fa-lg" aria-hidden="true"></i>
            <p class="commentNbr">{{ thisPost.comCount }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="commentBloc">
      <div class="myCommentBloc">
        <div class="myCommentTitle">
          <h2>Votre message</h2>
        </div>
        <div class="myCommentMsg">
          <form
            action="/upload"
            method="POST"
            name="createCommentForm"
            class="formBloc"
            enctype="multipart/form-data"
          >
            <div class="formControlComment">
              <input
                v-model="commentText"
                type="text"
                placeholder="Ecrire un commentaire..."
                id="commentText"
                name="commentText"
                required
              />
              <div class="btnCommentBloc">
                <button
                  type="button"
                  @click="btnCreateComment()"
                  id="confirmComment"
                  name="confirmComment"
                  class="confirmComment"
                >
                  Publier
                </button>
              </div>
            </div>
          </form>
          <div
            class="allComBloc"
            v-for="com in allCom"
            :key="com.id"
            :id="com.id"
          >
            <div class="userInfoCom">
              <p class="comMailStyle">{{ com.email }}</p>
              <p class="dateStyle">{{ renderDate(com.commentDate) }}</p>
              <div class="comDelete" v-if="currentUser.userRole == 1">
                <button class="deleteComment" @click="btnDeleteComment(com.id)">
                  Supprimer ce commentaire
                </button>
              </div>
            </div>
            <div class="msgCom">
              <p class="msgComStyle">{{ com.commentText }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import BackToPost from "@/components/BackToPost.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "ThisPost",
  components: {
    BackToPost,
    Footer,
  },
  data: () => {
    return {
      com: "",
      commentText: "",
    };
  },
  computed: {
    ...mapState(["thisPost", "allCom", "currentUser"]),
  },
  mounted() {
    const idRoute = this.$route.params.id;
    this.$store.dispatch("getThisPost", idRoute);
    this.$store.dispatch("getAllCom", idRoute);
    this.$store.dispatch("getCurrentUser");
  },
  methods: {
    btnLogout() {
      this.$store.commit("btnLogout");
      this.$router.push("/");
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

    btnCreateComment() {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const idRoute = this.$route.params.id;
      const commentBody = {
        commentDate: this.commentDate,
        commentText: this.commentText,
        post_id: idRoute,
        user_id: token,
      };
      this.$store.dispatch("btnCreateComment", commentBody);
    },
    btnDeleteComment(idCom) {
      this.$store.dispatch("deleteComment", idCom);
    },
  },
};
</script>

<style scoped>
@import "../assets/thisPost.css";
</style>
