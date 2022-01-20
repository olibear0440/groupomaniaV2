<template>
<div class="navBloc">
    <div class="nav">
        <router-link class="homeLink" to="/">Accueil</router-link> - 
        <router-link class="registerLink" to="/Register">Acceder à votre compte</router-link>
    </div>
</div>
</template>
<script>
export default {
  name: "Nav",
}


</script>
<style scoped lang="scss">
@import "../assets/nav.css";
</style>