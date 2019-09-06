<template>
  <div>
    <md-app>
      <md-app-toolbar class="md-title">Token Management</md-app-toolbar>
      <md-app-content>
        <TokenAddress @tokenaddress-submitted="addToken"></TokenAddress>
        <TokenDetails
          v-for="tokenAddress in erc20Tokens"
          :tokenAddress="tokenAddress"
          v-bind:key="tokenAddress"
        ></TokenDetails>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import TokenAddress from "./TokenAddress.vue";
import TokenDetails from "./TokenDetails.vue";
import blockchain from "../js/blockchainInterface";

export default {
  components: {
    TokenAddress,
    TokenDetails
  },
  data() {
    return { erc20Tokens: [] };
  },
  created: async function() {
    var token = await blockchain.getDex3BaseToken();
    this.addToken(token);
    var t1 = await blockchain.getPersonalTokenInfo(
      "0x201368dC6131E58Ba3fCe122187C669e6d21CD2F"
    );
    this.addToken(t1);
  },
  methods: {
    addToken(erc20Token) {
      console.log("Adding erc20Token:", erc20Token);
      this.erc20Tokens.push(erc20Token.address);
    }
  }
};
</script>