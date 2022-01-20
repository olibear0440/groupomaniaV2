<template>
  <div class="homePage">
    <Nav />
    <HeaderHome />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderHome from "@/components/HeaderHome.vue";
import Footer from "@/components/Footer.vue";
import Nav from "@/components/Nav.vue";
export default {
  name: "Home",
  components: {
    Nav,
    HeaderHome,
    Footer,
  },
};
</script>

<style scoped lang="scss"></style>
