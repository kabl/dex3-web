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
    <link rel="stylesheet" href="https://unpkg.com/vue-material/dist/theme/default.css" />
  </head>
  <body>
    <div id="app">
      <img alt="Vue logo" src="./assets/logo.png" />
      <TokenContainer />
      <CreateOrder />
      <FillOrder />
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
