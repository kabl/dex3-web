<template>
  <md-app>
    <md-app-toolbar class="md-title">Market Taker - Fill Order</md-app-toolbar>
    <md-app-content>
      <md-field>
        <label>Signed Maker Order</label>
        <md-textarea v-model="signedOrder" type="text"></md-textarea>
      </md-field>

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

export default {
  data() {
    return {
      signedOrder: null,
      takerAmount: null
    };
  },
  methods: {
    async fillOrder() {
      console.log("Fill Order clicked");
      await blockchain.fillOrder(this.signedOrder, this.takerAmount);
    }
  }
};
</script>
