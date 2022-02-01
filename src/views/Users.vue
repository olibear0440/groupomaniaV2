<template>
  <div class="usersBloc">
    <BackToPost />
    <div class="allUsers">
      <div class="usersTitle">
        <h2>Utilisateurs enregistrés dans la base de donnée</h2>
      </div>
      <div class="users" v-for="user in allUsers" :key="user.id">
        <div class="usersInfos">
          <p class="userEmail">{{ user.email }}</p>
          <p class="userFirstname">{{ user.firstname }}</p>
          <p class="userLastname">{{ user.lastname }}</p>
          <button class="btnDeleteUser" @click="btnDeleteUser(user.id)">
            Supprimer
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import BackToPost from "@/components/BackToPost.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";
export default {
  name: "Users",
  components: {
    BackToPost,
    Footer,
  },
  mounted() {
    this.$store.dispatch("getAllUsers");
  },
  computed: {
    ...mapState(["allUsers"]),
  },
  methods: {
    btnDeleteUser(id_user) {
      this.$store.dispatch("deleteUser", id_user);
    },
  },
};
</script>
<style scoped lang="scss">
@import "../assets/users.css";
</style>
