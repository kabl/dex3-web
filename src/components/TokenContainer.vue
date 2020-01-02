<template>
  <v-card class="mx-auto">
    <v-toolbar color="indigo" dark>
      <v-toolbar-title>Token Management</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Instruction</v-card-title>
            <v-card-text>
              Add the address from the ERC20 tokens you want to list here. The tokens which will be used
              to settle the trades requires to be approved to the DEX3 smart contract. Enable these tokens by the "DEX ALLOW" option.
              <TokenAddress @tokenaddress-submitted="addToken"></TokenAddress>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-for="token in $store.getters.tokens" v-bind:key="token.address">
        <v-col>
          <TokenDetails :token="token"></TokenDetails>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
  created: async function() {
    // var token = await blockchain.getDex3BaseToken();
    // this.addToken(token);
    // var t1 = await blockchain.getPersonalTokenInfo(
    //   "0x201368dC6131E58Ba3fCe122187C669e6d21CD2F"
    // );
    // this.addToken(t1);
  },
  methods: {
    addToken(address) {
      console.log("Adding erc20Token:", address);
      this.$store.dispatch("updateToken", address);
    }
  }
};
</script>