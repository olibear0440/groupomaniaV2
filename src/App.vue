<template>
  <div id="app">
    <!--
  <div id="nav">
    <router-link to="/">Accueil</router-link> - 
    <router-link to="/Register">Acceder à votre compte</router-link> 
    
    <router-link to="/Mypost">Mypost</router-link> |
    <router-link to="/Posts:id">ThisPost</router-link>
    
  </div>
  -->
    <router-view />
  </div>
</template>

<script></script>

<style lang="scss">
body {
  background-color: rgb(255, 215, 215);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: auto;
}
</style>
