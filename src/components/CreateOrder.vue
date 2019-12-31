<template>
  <div>
    <div class="v-title">Market Maker - Create Order</div>
      <v-simple-table dense>
        <tbody>
        <tr>
          <td>
            <div style="text-align: left">Token Address</div>
          </td>
          <td>
              <v-input v-model="tokenaddress" type="text" placeholder="0x..."></v-input>
          </td>
        </tr>

        <tr>
          <td>
            <div style="text-align: left">Order Type</div>
          </td>
          <td>
            <div style="text-align: left">
              <v-radio v-model="isSellOrder" value="1">Sell Order</v-radio>
              <br />
              <v-radio v-model="isSellOrder" value="0">Buy Order</v-radio>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div style="text-align: left">Amount to trade</div>
          </td>
          <td>
              <v-input v-model="makerAmount" type="text" value="1000" />
          </td>
        </tr>

        <tr>
          <td>
            <div style="text-align: left">Total price (WETH)</div>
          </td>
          <td>
              <v-input v-model="makerPrice" type="text" value="100" />
          </td>
        </tr>

        <tr>
          <td>
            <div style="text-align: left">Order Fill option</div>
          </td>
          <td>
            <div style="text-align: left">
              <v-radio v-model="isPartialFillable" value="1">Allow partial order fill</v-radio>
              <br />
              <v-radio v-model="isPartialFillable" value="0">Require full order fill</v-radio>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div style="text-align: left">Order lifetime</div>
          </td>
          <td>
            <div style="text-align: left">
              <v-radio v-model="lifetime" value="300">5 min</v-radio>
              <v-radio v-model="lifetime" value="1800">30 min</v-radio>
              <v-radio v-model="lifetime" value="604800">1 week</v-radio>
            </div>
          </td>
        </tr>
        </tbody>
      </v-simple-table>

      <v-dialog :v-active.sync="showDialog">
        <v-dialog-title>OTC Order Created</v-dialog-title>
        <v-divider />
        <div>
          <v-content>
            <code style="white-space: pre-line">{{ jsonOrder }}</code>
          </v-content>
        </div>
        <v-divider />

        <v-dialog-actions>
          <v-btn class="v-primary" @click="showDialog = false">Close</v-btn>
        </v-dialog-actions>
      </v-dialog>

      <!-- Button -->
        <v-btn class="v-raised" v-on:click="createOrder">Create Order</v-btn>
        <v-btn class="v-raised v-accent" v-on:click="signOrder">Sign Order</v-btn>
    </div>
</template>

<script>
import blockchain from "../js/blockchainInterface";

export default {
  data() {
    return {
      tokenaddress: "0x201368dC6131E58Ba3fCe122187C669e6d21CD2F",
      makerPrice: "100",
      makerAmount: "1000",
      isSellOrder: "1",
      isPartialFillable: "1",
      lifetime: "604800",
      showDialog: false,
      jsonOrder: null
    };
  },
  methods: {
    async createOrder() {
      console.log("Create order clicked");

      var ttl = Math.floor(Date.now() / 1000);
      ttl = ttl + parseInt(this.lifetime, 10);
      var tokenToTrade = await blockchain.getPersonalTokenInfo(this.tokenaddress);
      var amount = blockchain.toContractNumber(this.makerAmount, tokenToTrade.decimals);
      console.log("amount: ", amount);
      var price = blockchain.toContractNumber(this.makerPrice, 18);
      console.log("price: ", price);

      var order = {
        token: this.tokenaddress,
        price: price,
        amount: amount,
        isSellOrder: parseInt(this.isSellOrder),
        partialFillAllowed: parseInt(this.isPartialFillable),
        ttl: ttl,
        //ttl: 2164596577,
        hash: undefined,
        sig: undefined
      };

      order.hash = await blockchain.calcHash(order);
      this.jsonOrder = JSON.stringify(order, null, 2);
      console.log("Order:", this.jsonOrder);
      return order;
    },
    async signOrder() {
      var order = await this.createOrder();
      order.sig = await blockchain.signHash(order.hash);
      this.jsonOrder = JSON.stringify(order, null, 2);
      console.log("Signed Order:", this.jsonOrder);
      this.showDialog = true;
    }
  }
};
</script>
