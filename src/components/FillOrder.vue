<template>
  <md-app>
    <md-app-toolbar class="md-title">Market Taker - Fill Order</md-app-toolbar>
    <md-app-content>
      <md-field>
        <label>Signed Maker Order</label>
        <md-textarea v-model="signedOrder" type="text"></md-textarea>
      </md-field>

      <md-field>
        <md-button class="md-raised md-primary" v-on:click="validateOrder">Validate Order</md-button>
      </md-field>

      <OrderDetails v-if="order" :order="order" v-bind:key="order.hash"></OrderDetails>

      <md-field>
        <label>Taker Amount</label>
        <md-input v-model="takerAmount" type="text"></md-input>
      </md-field>

      <md-field>
        <md-button class="md-raised md-accent" v-on:click="fillOrder">Fill Order</md-button>
      </md-field>
    </md-app-content>
  </md-app>
</template>

<script>
import blockchain from "../js/blockchainInterface";
import OrderDetails from "./OrderDetails.vue";

export default {
  components: {
    OrderDetails
  },
  data() {
    return {
      signedOrder: null,
      takerAmount: null,
      order: null
    };
  },
  methods: {
    async fillOrder() {
      console.log("Fill Order clicked");
      //var order = JSON.parse(this.signedOrder);
      await blockchain.fillOrder(this.order, this.takerAmount);
    },
    async validateOrder() {
      this.order = JSON.parse(this.signedOrder);
    }
  }
};
</script>
