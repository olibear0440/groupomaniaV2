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

<style scoped lang="scss">
.homePage {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0 auto;
  max-width: 1000px;
  height: auto;
}
</style>
