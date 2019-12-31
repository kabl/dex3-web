<template>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="app">
      <span class="v-display-3">DEX 3</span>
      <p />
      <span class="v-headline">Simple, Fast, Reliable</span>
      <p />
      <div class="v-layout v-gutter" :class="`v-alignment-top-center`">
        <div class="v-layout-item v-size-40">
          <TokenContainer />
        </div>
        <div class="v-layout-item v-size-40">
          <v-app>
            <div>Create or Fill Order</div>

            <v-app-content>
              <div>
                <v-radio v-model="isMarketMaker" :value="true">Create a new Order</v-radio>
                <v-radio v-model="isMarketMaker" :value="false">Fill an existing Order</v-radio>
              </div>
            </v-app-content>
          </v-app>

          <div class="v-layout-item" v-if="isMarketMaker">
            <CreateOrder />
          </div>
          <div class="v-layout-item" v-else>
            <FillOrder />
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
</template>

<script>
import Vue from "vue";
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

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 60px;
}
</style>
