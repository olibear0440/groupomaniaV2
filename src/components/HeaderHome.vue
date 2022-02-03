<template>
  <div class="homeLogoBloc">
    <div class="logo">
      <img :alt="image.alt" src="../assets/img/icon-above-fontResiz.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: () => {
    return {
      image: {
        alt: "logo Groupomania",
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/headerHome.css";
</style>
