<template>
  <div>
    <TokenAddress @tokenaddress-submitted="addToken"></TokenAddress>
    <ul>
      <TokenDetails
        v-for="tokenAddress in erc20Tokens"
        :tokenAddress="tokenAddress"
        v-bind:key="tokenAddress"
      ></TokenDetails>
    </ul>
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
  },
  methods: {
    addToken(erc20Token) {
      console.log("Adding erc20Token:", erc20Token);
      this.erc20Tokens.push(erc20Token.address);
    }
  }
};
</script>