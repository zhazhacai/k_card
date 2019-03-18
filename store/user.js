export default {
  namespace: 'user',

  state: {
    token: null,
    userInfo: null,
    corpInfo: null
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserInfo(state, d) {
      state.userInfo = d;
    },
    setCorpInfo(state, d) {
      state.corpInfo = d;
    },
  },
}