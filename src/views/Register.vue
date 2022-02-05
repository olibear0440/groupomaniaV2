<template>
  <div class="registerBloc">
    <div class="registerLogo">
      <img
        class="homeLogo"
        src="../assets/img/logoSimple.png"
        alt="logo groupomania"
      />
    </div>
    <div class="createAccount">
      <div id="formTitre">
        <h1 v-if="mode == 'loginAccount'">Connexion</h1>
        <h1 v-else>Inscription</h1>
      </div>
      <form class="formSignup" id="formSignup">
        <div class="formControl">
          <p class="switchLogin" v-if="mode == 'loginAccount'">
            Si vous n'avez pas encore de compte ?
            <span @click="switchToCreateAccount()">Creer un compte</span>
          </p>
          <p class="switchLogin" v-else>
            Vous avez déjà un compte ?
            <span @click="switchToLoginAccount()">Se connecter </span>
          </p>

          <div class="createAccountField" v-if="mode == 'createAccount'">
            <input
              v-model="nom"
              type="text"
              placeholder="Nom"
              id="firstname"
              name="firstname"
              aria-required="true"
              required
            /><br />
            <input
              v-model="prenom"
              type="text"
              placeholder="Prénom"
              id="lastname"
              name="lastname"
              aria-required="true"
              required
            /><br />
          </div>

          <input
            v-model="email"
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            aria-required="true"
            required
          /><br />
          <input
            v-model="mdp"
            type="password"
            placeholder="Mot de passe"
            id="password"
            name="password"
            aria-required="true"
            required
          />
          <p
            class="errorLogin"
            v-if="mode == 'loginAccount' && status == 'error_login'"
          >
            Echec de la connection; Email et/ou mot de passe non valide
          </p>

          <p
            class="errorLogin"
            v-if="mode == 'createAccount' && status == 'error_create'"
          >
            Identifiants de connexion non valide ou adresse mail déjà utilisée
          </p>
          <p id="errorRegxMdp"></p>

          <button
            @click="btnLoginAccount()"
            v-if="mode == 'loginAccount'"
            id="confirmForm"
            class="confirmForm"
            type="button"
            name="confirmForm"
          >
            <span class="btnLoading" v-if="status == 'loading'"
              >Connexion en cours...</span
            >
            <span class="btnValidated" v-else>Connexion</span>
          </button>
          <button
            @click="btnCreateAccount()"
            v-else
            id="confirmForm"
            class="confirmForm"
            type="button"
            name="confirmForm"
          >
            <span class="btnLoading" v-if="status == 'loading'"
              >Création en cours...</span
            >
            <span class="btnValidated" v-else>Creer mon compte</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Register",
  data: () => {
    return {
      mode: "loginAccount",
      nom: "",
      prenom: "",
      email: "",
      mdp: "",
    };
  },
  computed: {
    ...mapState(["status"]),
  },

  methods: {
    switchToCreateAccount: function () {
      this.mode = "createAccount";
    },
    switchToLoginAccount: function () {
      this.mode = "loginAccount";
    },
    btnLoginAccount: function () {
      let self = this;
      this.$store
        .dispatch("btnLoginAccount", {
          //recuperer les parametres: email et password de la bd et les relier au data du frontend
          email: this.email,
          password: this.mdp,
        })
        .then(function () {
          self.$router.push("/Posts");
        }),
        function (error) {
          console.log(error);
        };
    },

    btnCreateAccount: function () {
      document.getElementById("password").classList.remove("inputError");
      const errorMdp = document.getElementById("errorRegxMdp");
      const regexs = [
        /^.{8,}$/, //min 8 caractères
        /[A-Z]/, //min 1 lettres majuscules
        /[a-z]/, //min 1 lettres minuscules
        /\d/, //min 1 chiffre
        /[@%#$^&*]/, //caracteres speciaux acceptés
      ];
      errorMdp.innerHTML = "";
      if (regexs.some((regex) => !regex.test(this.mdp))) {
        document.getElementById("password").classList.add("inputError");
        errorMdp.innerHTML =
          "Le mot de passe doit contenir 8 caractères minimum, une majuscule, une majuscule, un chiffre et un symbole";
        return;
      }
      let self = this;
      this.$store
        .dispatch("btnCreateAccount", {
          firstname: this.nom,
          lastname: this.prenom,
          email: this.email,
          password: this.mdp,
        })
        .then(function () {
          self.btnLoginAccount();
        }),
        function (error) {
          console.log(error);
        };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/register.css";
</style>
