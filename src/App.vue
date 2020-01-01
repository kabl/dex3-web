<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container>
        <router-view />
        <TokenContainer />
      </v-container>
    </v-content>

    <Footer />

  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
    Footer,
  }
};
</script>