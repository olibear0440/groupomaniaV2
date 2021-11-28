import { createStore } from "vuex";
const axios = require("axios");

//import url de l'api
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
  newPost: [],
};
const mutations = {
  SET_STATUS(state, status) {
    state.status = status;
  },
  
  LOG_NEWPOST(state, newPost) {
    state.newPost = newPost;
  },
  
  //recuperer header token et enregistrer dans le localstorage le user
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
  //appel api pour le login du compte
  btnLoginAccount: ({ commit }, infoUser) => {
    commit("SET_STATUS", "loading");
    return new Promise((resolve, reject) => {
      //console.log(infoUser)
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

  //fonction appel api pour la creation du compte
  btnCreateAccount: ({ commit }, newUser) => {
    commit("SET_STATUS", "loading");
    return new Promise((resolve, reject) => {
      commit;
      //console.log(newUser)
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

  //appel api de l'utilisateur par le token
  getCurrentUser({ commit }) {
    instance
      .get("/users/currentUser")
      .then((response) => {
        //console.log(response.data);
        commit("CURRENT_USER", response.data);
      })
      .catch(function () {});
  },

  getAllPosts({ commit }) {
    instance
      .get("/posts")
      .then((response) => {
        //console.log(response.data);
        commit("GET_ALL_POSTS", response.data);
      })
      .catch(function () {});
  },
  
  btnCreatePost({ commit }) {
    //commit;
    instance
      .post("/posts")
      .then((response) => {
        console.log(response.data);
        commit("LOG_NEWPOST", response.data);
        //window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
});
