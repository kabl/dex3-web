<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-cell>Token to Trade</md-table-cell>
        <md-table-cell>{{ erc20Token.name }} / {{ erc20Token.symbol }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Order Type</md-table-cell>
        <md-table-cell>{{ order.isSellOrder }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Price</md-table-cell>
        <md-table-cell>{{ order.price }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Amount</md-table-cell>
        <md-table-cell>{{ order.amount }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Fill Option</md-table-cell>
        <md-table-cell>{{ order.partialFillAllowed }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Lifetime</md-table-cell>
        <md-table-cell>{{ order.ttl }}</md-table-cell>
      </md-table-row>
      <!-- <md-table-row>
        <md-table-cell>Hash</md-table-cell>
        <md-table-cell>{{ order.hash }}</md-table-cell>
      </md-table-row> -->
      <!-- <md-table-row>
        <md-table-cell>Signature</md-table-cell>
        <md-table-cell>{{ order.sig }}</md-table-cell>
      </md-table-row> -->
    </md-table>
  </div>
</template>

<script>
import blockchain from "../js/blockchainInterface";

export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      erc20Token: {}
    };
  },
  created: async function() {
    console.log("Created:", this.order.token);
    this.erc20Token = await blockchain.getPersonalTokenInfo(this.order.token);
  },
  methods: {
    async refresh() {}
  }
};
</script>