<template>
  <div>
    <v-card class="mx-auto">
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>Create Order (Market Maker)</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-container fluid>
        <v-row no-gutters>
          <v-col>
            <v-select
              v-model="tokenToTrade"
              :items="$store.getters.tokens"
              item-text="name"
              return-object
              label="Token to Trade"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col md="6" cols="6">Order Type</v-col>
          <v-col md="6" cols="6">
            <v-radio-group v-model="isSellOrder" :mandatory="true">
              <v-radio color="indigo" value="1" label="Sell Order"></v-radio>
              <v-radio color="indigo" value="0" label="Buy Order"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-text-field
              v-model="makerPrice"
              label="Trading price per Token in WETH"
              type="text"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-text-field
              v-model="makerAmount"
              label="Amount of Tokens to trade"
              type="text"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col md="6" cols="6">Order Fill option</v-col>
          <v-col md="6" cols="6">
            <v-radio-group v-model="isPartialFillable" :mandatory="true">
              <v-radio color="indigo" value="1" label="Allow partial order fill"></v-radio>
              <v-radio color="indigo" value="0" label="Require full order fill"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col md="6" cols="6">Order lifetime</v-col>
          <v-col md="6" cols="6">
            <v-radio-group v-model="lifetime" :mandatory="true">
              <v-radio color="indigo" value="300" label="5 min"></v-radio>
              <v-radio color="indigo" value="1800" label="30 min"></v-radio>
              <v-radio color="indigo" value="604800" label="1 week"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col md="12" cols="12">
            <v-btn color="primary" v-on:click="signOrder" block>Create and Sign Order</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>OTC Order Created</v-card-title>
        <v-spacer></v-spacer>

        <v-card-text>
          <code style="word-break: break-all;">{{ jsonOrder }}</code>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import blockchain from "../js/blockchainInterface";

export default {
  name: "CreateOrder",
  data() {
    return {
      tokenToTrade: {},
      makerPrice: "1",
      makerAmount: "10",
      isSellOrder: "1",
      isPartialFillable: "1",
      lifetime: "604800",
      dialog: false,
      jsonOrder: null
    };
  },
  methods: {
    async createOrder() {
      console.log("Create order clicked:", this.tokenToTrade);

      var ttl = Math.floor(Date.now() / 1000);
      ttl = ttl + parseInt(this.lifetime, 10);
      var amount = blockchain.toContractNumber(
        this.makerAmount,
        this.tokenToTrade.decimals
      );
      console.log("amount: ", amount);
      var totalPrice =
        parseFloat(this.makerPrice) * parseFloat(this.makerAmount);
      var price = blockchain.toContractNumber(totalPrice, 18);
      console.log("price: ", price);

      var order = {
        token: this.tokenToTrade.address,
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
      this.dialog = true;
    }
  }
};
</script>
