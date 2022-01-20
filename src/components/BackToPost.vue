<template>
<div class="navBackToPostBloc">
    <div class="BackToPostBloc"> 
      <div @click="btnLogout()" class="logoutLink">Deconnexion</div> - 
      <div class="BackToPostLink" @click="btnBackToPost()">Retour</div>
    </div>
</div>
</template>
<script>
export default {
  name: "BackToPost",
  methods:{
    btnLogout() {
      this.$store.commit("btnLogout");
      this.$router.push("/");
    },
    btnBackToPost() {
      this.$router.push("/Posts");
    },
}
}


</script>
<style scoped lang="scss">
@import "../assets/backToPost.css";
</style>