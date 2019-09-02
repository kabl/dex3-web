<template>
  <div class="border border-primary">
    <div>Address: {{ erc20Token.address }}</div>
    <div>Name: {{ erc20Token.name }} / {{ erc20Token.symbol }}</div>
    <div>Balance: {{ erc20Token.balance }}</div>
    <div>DEX Allowance: {{ erc20Token.dexAllowance }}</div>
    <button v-on:click="dexAllow">DEX Allow</button>
    <button v-on:click="dexDeny">DEX Deny</button>
  </div>
</template>

<script>
import blockchain from "../js/blockchainInterface";

export default {
  props: {
    tokenAddress: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      erc20Token: {}
    };
  },
  created: async function() {
     await this.refresh();
    this.interval = setInterval(this.refresh, 2000);
  },
  methods: {
    async dexAllow() {
      await blockchain.dexAllow(
        this.erc20Token.address,
        this.erc20Token.balance
      );
      await refresh();
    },
    async dexDeny() {
      await blockchain.dexDeny(this.erc20Token.address);
      await refresh();
    },
    async refresh() {
      this.erc20Token = await blockchain.getPersonalTokenInfo(
        this.tokenAddress
      );
    }
  }
};
</script>
