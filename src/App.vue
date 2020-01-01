<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>DEX3 - Simple, Fast, Reliable</v-toolbar-title>
    </v-app-bar>

    <v-content>
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
    </v-content>
  </v-app>
</template>

<script>
import TokenContainer from "./components/TokenContainer.vue";
import CreateOrder from "./components/CreateOrder.vue";
import FillOrder from "./components/FillOrder.vue";

export default {
  name: "app",
  data() {
    return {
      isMarketMaker: true
    };
  },
  components: {
    TokenContainer,
    CreateOrder,
    FillOrder
  }
};
</script>
