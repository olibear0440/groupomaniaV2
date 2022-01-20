<template>
  <div class="navLogoutBloc">
    <div class="logoutBloc">
      <div @click="btnLogout()" class="logoutLink">Deconnexion</div>
      -
      <div class="createPostLink" @click="btnCreateMyPost()">Creer un post</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Logout",
  methods: {
    btnLogout() {
      this.$store.commit("btnLogout");
      this.$router.push("/");
    },
    btnCreateMyPost() {
      this.$router.push("/Mypost");
    },
  },
};
</script>
<style scoped lang="scss">
@import "../assets/logout.css";
</style>
