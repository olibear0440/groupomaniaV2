<template>
  <div class="navBackToPostBloc">
    <div class="blocPostsLogo">
      <img
        class="pagePostsLogo"
        src="../assets/img/logoSimple.png"
        alt="logo groupomania"
      />
    </div>
    <div class="BackToPostBloc">
      <div @click="btnLogout()">
        <router-link class="logoutLink" to="/">Deconnexion</router-link>
      </div>
      -
      <div @click="btnBackToPost()">
        <router-link class="BackToPostLink" to="/Posts">Retour</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BackToPost",
  methods: {
    btnLogout() {
      this.$store.commit("btnLogout");
      this.$router.push("/");
    },
    btnBackToPost() {
      this.$router.push("/Posts");
    },
  },
};
</script>
<style scoped lang="scss">
@import "../assets/backToPost.css";
</style>
