<template>
  <section>
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

          <div v-if="mode == 'createAccount'">
            <input
              v-model="nom"
              type="text"
              placeholder="Nom"
              id="firstname"
              name="firstname"
              required
            /><br />
            <input
              v-model="prenom"
              type="text"
              placeholder="Prénom"
              id="lastname"
              name="lastname"
              required
            /><br />
          </div>

          <input
            v-model="email"
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            required
          /><br />
          <input
            v-model="mdp"
            type="text"
            placeholder="Mot de passe"
            id="password"
            name="password"
            required
          /><br />
          <p
            class="errorLogin"
            v-if="mode == 'loginAccount' && status == 'error_login'"
          >
            Adresse mail et/ou mot de passe invalide
          </p>

          <p
            class="errorLogin"
            v-if="mode == 'createAccount' && status == 'error_create'"
          >
            Adresse mail déjà utilisée
          </p>

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
  </section>
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
      //console.log(this.nom, this.prenom, this.email, this.motDePasse)
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

<style scoped>
section {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 50px 0px;
}
.createAccount {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 400px;
  max-width: 100%;
  margin-bottom: 20px;
}
#formTitre {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 40px;
}
#formTitre h1 {
  margin: 0;
}
.switchLogin {
  font-size: 12px;
}
span {
  color: blue;
  text-decoration-line: underline;
  cursor: pointer;
}
.btnLoading,
.btnValidated {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-family: inherit;
}
.errorLogin {
  font-size: 14px;
  color: red;
}

.formSignup {
  padding: 30px 40px;
}
.formControl {
  margin-bottom: 10px;
  padding-bottom: 20px;
  position: relative;
}

.formControl label {
  display: inline-block;
  margin-bottom: 5px;
  font-weight: 600;
}

.formControl input {
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  font-family: inherit;
  font-size: 14px;
  width: 297px;
  padding: 10px;
}
.confirmForm {
  background-color: #8e44ad;
  border: 2px solid #8e44ad;
  color: white;
  display: block;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
}
</style>
