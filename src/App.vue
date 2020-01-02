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
import blockchain from "./js/blockchainInterface"

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
    this.$store.dispatch("updateToken", wethTokenAddr);
    this.$store.dispatch("updateToken", "0x201368dC6131E58Ba3fCe122187C669e6d21CD2F");
  }
};
</script>