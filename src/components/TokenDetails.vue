<template>
  <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">{{ erc20Token.name }} / {{ erc20Token.symbol }}</div>
        <div class="md-subhead">{{ erc20Token.address }}</div>
      </md-card-header>
      <md-card-content>
        <div>Balance: {{ erc20Token.balance }}</div>
        <div>DEX Allowance: {{ erc20Token.dexAllowance }}</div>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-accent" v-on:click="dexAllow">DEX Allow</md-button>
        <md-button class="md-raised md-accent" v-on:click="dexDeny">DEX Deny</md-button>
      </md-card-actions>
  </md-card>
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
      await this.refresh();
    },
    async dexDeny() {
      await blockchain.dexDeny(this.erc20Token.address);
      await this.refresh();
    },
    async refresh() {
      this.erc20Token = await blockchain.getPersonalTokenInfo(
        this.tokenAddress
      );
    }
  }
};
</script>
