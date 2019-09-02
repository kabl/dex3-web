<template>
  <md-app>
    <md-app-toolbar class="md-title">Token Management</md-app-toolbar>
    <md-app-content>
    <md-field>
      <label>Token Address</label>
      <md-input v-model="tokenaddress"></md-input>
    </md-field>
    <md-button class="md-raised" v-on:click="onSubmit">Submit</md-button>
    </md-app-content>
  </md-app>
</template>
<script>
import blockchain from "../js/blockchainInterface";

export default {
  data() {
    return {
      tokenaddress: null
    };
  },
  methods: {
    async onSubmit() {
      // var web3 = blockchain.getWeb3();
      blockchain.showMessage();
      var info = await blockchain.getPersonalTokenInfo(this.tokenaddress);
      console.log("info:", info);

      this.$emit("tokenaddress-submitted", info);
      this.tokenaddress = null;
    }
  }
};
</script>
