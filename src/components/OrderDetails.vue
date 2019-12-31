<template>
  <div :v-if="order != null">
    <v-simple-table dense>
      <tbody>
      <tr>
        <td>Token to Trade</td>
        <td>{{ erc20Token.name }} / {{ erc20Token.symbol }}</td>
      </tr>
      <tr>
        <td>Order Type</td>
        <td>{{ orderType }}</td>
      </tr>
      <tr>
        <td>Price</td>
        <td>{{ humanPrice }}</td>
      </tr>
      <tr>
        <td>Amount</td>
        <td>{{ humanAmount }}</td>
      </tr>
      <tr>
        <td>Fill Option</td>
        <td>{{ fillOption }}</td>
      </tr>
      <tr>
        <td>Lifetime</td>
        <td>{{ order.ttl }}</td>
      </tr>

      <!-- <tr>
        <td>Hash</td>
        <td>{{ order.hash }}</td>
      </tr>-->
      <!-- <tr>
        <td>Signature</td>
        <td>{{ order.sig }}</td>
      </tr>-->
      </tbody>
    </v-simple-table>
    <div>{{ description }}</div>
  </div>
</template>

<script>
import blockchain from '../js/blockchainInterface';
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
    },
    humanAmount: function() {
      return blockchain.toHumanNumber(this.order.amount, this.erc20Token.decimals);
    },
    humanPrice: function() {
      return blockchain.toHumanNumber(this.order.price, 18);
    },
    description: function() {
      var buySell = this.order.isSellOrder == 0 ? "buy" : "sell";
      return "Market maker offers to " + buySell + " " + this.humanAmount + " " + this.erc20Token.symbol + " for " + this.humanPrice + " WETH."
    }
  }
};
</script>