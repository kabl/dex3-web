<template>
  <div>
    <md-field>
      <label>Token Address</label>
      <md-input v-model="tokenaddress"></md-input>
    </md-field>
    <md-field>
      <md-button class="md-raised md-primary" v-on:click="onSubmit">Submit</md-button>
    </md-field>
  </div>
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
