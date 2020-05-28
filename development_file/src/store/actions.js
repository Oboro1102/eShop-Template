// import Vue from 'vue';
// import mutations from './mutations';
// import * as types from './mutations_type.js';

export const LOGIN = ({ commit, state }, user) => {
  if (user.username === state.user.username && user.password === state.user.password) {
    const token = "ImLogin";
    sessionStorage.setItem("token", token);
    commit("GET_USER_LOGIN", token);
  } else {
    alert("Acount or Password incorrect.");
    sessionStorage.removeItem("token");
  }
}

export const LOGOUT = ({ commit }) => {
  sessionStorage.removeItem("token");
  const token = '';
  commit('GET_USER_LOGOUT', token);
}

export const SEARCH_RESULT = ({ commit }, data) => {
  sessionStorage.setItem("searchResult", JSON.stringify(data));
  commit('SET_SEARCH_RESULT', data);
}

export const SEARCH_RESULT_CLEAR = ({ commit }) => {
  commit('SET_SEARCH_RESULT', {});
}

export const SHOPCART = ({ commit }, data) => {
  sessionStorage.setItem("shopCart", JSON.stringify(data));
  commit('SET_SHOPCART', data);
}

export const SHOPCART_CLEAR = ({ commit }) => {
  commit('SET_SHOPCART', {});
}
