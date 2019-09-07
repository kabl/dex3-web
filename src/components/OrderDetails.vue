<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-cell>Token to Trade</md-table-cell>
        <md-table-cell>{{ erc20Token.name }} / {{ erc20Token.symbol }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Order Type</md-table-cell>
        <md-table-cell>{{ orderType }}</md-table-cell>
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
        <md-table-cell>{{ fillOption }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Lifetime</md-table-cell>
        <md-table-cell>{{ order.ttl }}</md-table-cell>
      </md-table-row>
      <!-- <md-table-row>
        <md-table-cell>Hash</md-table-cell>
        <md-table-cell>{{ order.hash }}</md-table-cell>
      </md-table-row>-->
      <!-- <md-table-row>
        <md-table-cell>Signature</md-table-cell>
        <md-table-cell>{{ order.sig }}</md-table-cell>
      </md-table-row>-->
    </md-table>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    },
    erc20Token: {
      type: Object,
      required: true
    }
  },
  computed: {
    orderType: function() {
      if (this.order.isSellOrder == 0) return "Buy Order";
      if (this.order.isSellOrder == 1) return "Sell Order";
      else return "Error OrderType";
    },
    fillOption: function() {
      if (this.order.partialFillAllowed == 0) return "Require full order fill";
      if (this.order.partialFillAllowed == 1) return "Allow partial order fill";
      return "Error FillOption";
    }
  }
};
</script>