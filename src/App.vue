<template>
<html>
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
    />
    <link rel="stylesheet" href="https://unpkg.com/vue-material/dist/vue-material.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/vue-material/dist/theme/default-dark.css" />
  </head>
  <body>
    <div id="app">
      <span class="md-display-3">DEX 3</span>
      <p />
      <span class="md-headline">Simple, Fast, Reliable</span>
      <p />
      <div class="md-layout md-gutter" :class="`md-alignment-top-center`">
        <div class="md-layout-item md-size-40">
          <TokenContainer />
        </div>
        <div class="md-layout-item md-size-40">
          <md-app>
            <md-app-toolbar class="md-title">Create or Fill Order</md-app-toolbar>

            <md-app-content>
              <div>
                <md-radio v-model="isMarketMaker" :value="true">Create a new Order</md-radio>
                <md-radio v-model="isMarketMaker" :value="false">Fill an existing Order</md-radio>
              </div>
            </md-app-content>
          </md-app>

          <div class="md-layout-item" v-if="isMarketMaker">
            <CreateOrder />
          </div>
          <div class="md-layout-item" v-else>
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
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import TokenContainer from "./components/TokenContainer.vue";
import CreateOrder from "./components/CreateOrder.vue";
import FillOrder from "./components/FillOrder.vue";
Vue.use(VueMaterial);

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
