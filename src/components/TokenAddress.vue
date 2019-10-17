<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-cell>
          <div style="text-align: left">Token Address</div>
        </md-table-cell>
        <md-table-cell style="width:100%;">
          <md-field>
            <md-input v-model="tokenaddress" placeholder="0x..."></md-input>
          </md-field>
        </md-table-cell>
        <md-table-cell>
          <md-button class="md-fab md-mini md-primary" v-on:click="onSubmit" :disabled="tokenaddress == null"><md-icon>add</md-icon></md-button>  
        </md-table-cell>
      </md-table-row>
    </md-table>
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
