<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container>
        <router-view />
        <TokenContainer />

        <div>
          <div>Create or Fill Order</div>
          <div>
            <v-radio v-model="isMarketMaker" :value="true">Create a new Order</v-radio>
            <v-radio v-model="isMarketMaker" :value="false">Fill an existing Order</v-radio>
          </div>
        </div>

        <CreateOrder />
        <FillOrder />
      </v-container>
    </v-content>

    <Footer />

  </v-app>
</template>

<script>
import TokenContainer from "./components/TokenContainer.vue";
import CreateOrder from "./components/CreateOrder.vue";
import FillOrder from "./components/FillOrder.vue";
import Navbar from './components/Navbar'
import Footer from './components/Footer'


export default {
  name: "app",
  data() {
    return {
      isMarketMaker: true,
      drawer: null
    };
  },
  components: {
    TokenContainer,
    CreateOrder,
    FillOrder,
    Navbar
  }
};
</script>