import { createStore } from "vuex";
const axios = require("axios");

//import url de l'api par axios
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

//verification du user dans le localstorage
let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

const state = {
  status: "",
  user: user,
  currentUser: [],
  allPosts: [],
  file: "",
  thisPost: [],
};

const mutations = {
  SET_STATUS(state, status) {
    state.status = status;
  },

  LOG_NEWPOST(state, newPost) {
    state.newPost = newPost;
  },
  //recuperer header token et enregistrer dans localstorage le user
  LOG_USER(state, user) {
    instance.defaults.headers.common["Authorization"] = user.token;
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
  CURRENT_USER(state, currentUser) {
    state.currentUser = currentUser;
  },
  GET_ALL_POSTS(state, allPosts) {
    state.allPosts = allPosts;
  },
  GET_THISPOST(state, thisPost) {
    state.thisPost = thisPost;
  },

  //deconnecter la session et supprimer le user du localstorage
  btnLogout(state) {
    state.user = {
      userId: -1,
      token: "",
    };
    localStorage.removeItem("user");
  },
};
const getters = {};
const actions = {
  //appel api sur le btn (connexion) pour le login du compte
  btnLoginAccount: ({ commit }, infoUser) => {
    commit("SET_STATUS", "loading");
    return new Promise((resolve, reject) => {
      instance
        .post("/registers/login", infoUser)
        .then(function (response) {
          commit("SET_STATUS", "login");
          commit("LOG_USER", response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit("SET_STATUS", "error_login");
          reject(error);
        });
    });
  },

  //appel api sur le btn (creer mon compte) pour la creation du compte
  btnCreateAccount: ({ commit }, newUser) => {
    commit("SET_STATUS", "loading");
    return new Promise((resolve, reject) => {
      instance
        .post("/registers/signup", newUser)
        .then(function (response) {
          //console.log(response);
          commit("SET_STATUS", "created");
          resolve(response);
        })
        .catch(function (error) {
          commit("SET_STATUS", "error_create");
          reject(error);
        });
    });
  },

  //appel api de l'utilisateur en cours
  getCurrentUser({ commit }) {
    instance
      .get("/users/currentUser")
      .then((response) => {
        commit("CURRENT_USER", response.data);
      })
      .catch(function () {});
  },

  //appel api de tt les posts
  getAllPosts({ commit }) {
    instance
      .get("/posts")
      .then((response) => {
        commit("GET_ALL_POSTS", response.data);
      })
      .catch(function () {});
  },

  //appel api sur le btn (creer un post) pour la creation d'un post
  btnCreatePost({ commit }) {
    //recuperer le formulaire html
    const form = document.forms["createPostForm"];
    //rechercher l'id correspondant au selecteur
    const myFiles = document.querySelector("#postImgUrl");
    //creer un nouvel objet formData et integrer les champs du formulaire (clé/valeur)
    const formData = new FormData();
    formData.append("postTitre", form.postTitre.value);
    formData.append("postDescription", form.postDescription.value);
    formData.append("postImgUrl", myFiles.files[0]);
    //recuperer le token de l'utilisateur depuis le local storage
    const token = JSON.parse(localStorage.getItem("user")).token;
    //appel api pour la creation du post
    instance
      .post("posts", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        commit("LOG_NEWPOST", response.data);
        //window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  },

  //appel api pour recuperer le post dans la page ThisPost
  //parametre de l'id (idRoute) en second parametre de l'api
  getThisPost({ commit }, idRoute) {
    const token = JSON.parse(localStorage.getItem("user")).token;
    instance
      .get("/posts/" + idRoute, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        //console.log("resultat avec idRoute en parametre (id de ThisPost.vue)", response.data);
        if(response.data.length>0)
        {
          commit("GET_THISPOST", response.data[0]);
        }
      })
      .catch(function () {});
  },
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
});
