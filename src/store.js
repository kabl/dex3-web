import Vue from 'vue'
import Vuex from 'vuex'
import blockchain from "./js/blockchainInterface"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokens: [],
    dex3Address: "0x7bd8D3C2E363c157b50373840239dA24BC3F7d57"
  },
  mutations: {
    updateToken(state, tokenInfo) {
      for (var i = 0; i < state.tokens.length; i++) {
        if (state.tokens[i].address === tokenInfo.address) {
          state.tokens[i] = tokenInfo;
          return;
        }
      }
      state.tokens.push(tokenInfo);
    },
  },
  actions: {
    updateToken: async (context, erc20Address) => {
      var tokenInfo = await blockchain.getPersonalTokenInfo(erc20Address);
      context.commit('updateToken', tokenInfo);
    },
  },
  getters: {
    tokens: state => state.tokens,
    dex3Addr: state => state.dex3Address,
  }
})
