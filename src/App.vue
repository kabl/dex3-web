<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container>
        <v-row>
          <v-col>
            <router-view />
          </v-col>
          <v-col>
            <TokenContainer />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TokenContainer from "./components/TokenContainer.vue";
import blockchain from "./js/blockchainInterface";
import eventListener from "./js/eventListener";

export default {
  name: "app",
  data() {
    return {
      drawer: null
    };
  },
  components: {
    TokenContainer,
    Navbar,
    Footer
  },
  created: async function() {
    console.log("DEX3 LOADED");
    var wethTokenAddr = await blockchain.getDex3BaseTokenAddr();

    var tokensToAdd = [];
    tokensToAdd.push(wethTokenAddr);
    tokensToAdd.push("0xF91Ab4a50bfcFed2fAcc5dDB0E59Fb0f96164b19");

    for (var i = 0; i < tokensToAdd.length; i++) {
      this.$store.dispatch("updateToken", tokensToAdd[i]);
      await eventListener.registerERC20Events(tokensToAdd[i]);
    }
  }
};
</script>