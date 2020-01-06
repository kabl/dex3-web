<template>
  <div :v-if="order != null">
    <v-simple-table dense>
      <tbody>
        <tr>
          <td>Trading pair</td>
          <td>{{ erc20Token.symbol }}/WETH</td>
        </tr>
        <tr>
          <td>Order Type</td>
          <td>{{ orderType }}</td>
        </tr>
        <tr>
          <td>Available Position</td>
          <td>{{ humanAmount }} @ {{ pricePerToken }} WETH</td>
        </tr>
        <tr>
          <td>Fill Option</td>
          <td>{{ fillOption }}</td>
        </tr>
        <tr>
          <td>Lifetime</td>
          <td>{{ expireDate }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <br>
    <div>{{ description }}</div>
  </div>
</template>

<script>
import blockchain from "../js/blockchainInterface";
const BigNumber = require("bignumber.js");

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
    pricePerToken: function() {
      if (this.order === null) return -1;
      const price = new BigNumber(this.order.price);
      const amount = new BigNumber(this.order.amount);
      return price.dividedBy(amount);
    },
    humanAmount: function() {
      return blockchain.toHumanNumber(
        this.order.amount,
        this.erc20Token.decimals
      );
    },
    expireDate: function() {
      var date = new Date(this.order.ttl*1000);
      return date.toISOString();
    },
    humanPrice: function() {
      return blockchain.toHumanNumber(this.order.price, 18);
    },
    description: function() {
      var buySell = this.order.isSellOrder == 0 ? "buy" : "sell";
      return (
        "Market maker offers to " +
        buySell +
        " " +
        this.humanAmount +
        " " +
        this.erc20Token.symbol +
        " for " +
        this.humanPrice +
        " WETH."
      );
    }
  }
};
</script>