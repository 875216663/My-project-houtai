import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
};

const actions = {
  //处理登录
  async login({ commit }, userInfo) {
    //解构出username和password，然后调用login接口向虚拟接口获取token
    const { username, password } = userInfo;
    let result = await login({ username: username.trim(), password: password });
    if (result.code === 20000) {
      // 如果登录成功，则将token存入vuex中，并设置到cookie中，这样可以实现页面刷新后仍然保持登录状态
      commit("SET_TOKEN", result.data.token);
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("error"));
    }
  },


  //处理获取用户信息
  async getInfo({ commit, state }) {
    // 从state中获取token，然后调用getInfo接口获取用户信息
    let result = await getInfo(state.token);
    
    if (result.code === 20000) {
      // 如果获取成功，则将用户信息存入vuex中（例如名字和头像）
      const { name, avatar } = result.data;
      commit("SET_NAME", name);
      commit("SET_AVATAR", avatar);
      return "ok"; // 返回成功标志
    } else {
      return Promise.reject(new Error("error")); // 如果失败，则返回错误
    }
  },

  //处理登出
  async logout({ commit, state }) {
    // 调用logout接口，清除vuex中的token和用户信息，并清除cookie中的token
    let result = await logout(state.token);

    if (result.code === 20000) {
      commit("RESET_STATE");
      removeToken();
      resetRouter();
      return "ok";
    } else {
      return Promise.reject(new Error("error"));
    }
  },
  
  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
