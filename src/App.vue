<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container>
        <v-row>
          <v-col >
            <router-view />
          </v-col>
          <v-col >
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
  }
};
</script>