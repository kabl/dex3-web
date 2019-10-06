<template>
  <md-app>
    <md-app-toolbar class="md-title">Market Maker - Create Order</md-app-toolbar>
    <md-app-content>
      <md-table>
        <md-table-row>
          <md-table-cell>
            <div style="text-align: left">Token Address</div>
          </md-table-cell>
          <md-table-cell>
            <md-field>
              <md-input v-model="tokenaddress" type="text" placeholder="0x..."></md-input>
            </md-field>
          </md-table-cell>
        </md-table-row>

        <md-table-row>
          <md-table-cell>
            <div style="text-align: left">Order Type</div>
          </md-table-cell>
          <md-table-cell>
            <div style="text-align: left">
              <md-radio v-model="isSellOrder" value="1">Sell Order</md-radio>
              <br />
              <md-radio v-model="isSellOrder" value="0">Buy Order</md-radio>
            </div>
          </md-table-cell>
        </md-table-row>

        <md-table-row>
          <md-table-cell>
            <div style="text-align: left">Amount to trade</div>
          </md-table-cell>
          <md-table-cell>
            <md-field>
              <md-input v-model="makerAmount" type="text" value="1000" />
            </md-field>
          </md-table-cell>
        </md-table-row>

        <md-table-row>
          <md-table-cell>
            <div style="text-align: left">Total price</div>
          </md-table-cell>
          <md-table-cell>
            <md-field>
              <md-input v-model="makerPrice" type="text" value="100" />
            </md-field>
          </md-table-cell>
        </md-table-row>

        <md-table-row>
          <md-table-cell>
            <div style="text-align: left">Order Fill option</div>
          </md-table-cell>
          <md-table-cell>
            <div style="text-align: left">
              <md-radio v-model="isPartialFillable" value="1">Allow partial order fill</md-radio>
              <br />
              <md-radio v-model="isPartialFillable" value="0">Require full order fill</md-radio>
            </div>
          </md-table-cell>
        </md-table-row>

        <md-table-row>
          <md-table-cell>
            <div style="text-align: left">Order lifetime</div>
          </md-table-cell>
          <md-table-cell>
            <div style="text-align: left">
              <md-radio v-model="lifetime" value="300">5 min</md-radio>
              <md-radio v-model="lifetime" value="1800">30 min</md-radio>
              <md-radio v-model="lifetime" value="604800">1 week</md-radio>
            </div>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <!-- <md-field>
        <label>Token Address</label>
        <md-input v-model="tokenaddress" type="text" placeholder="0x..."></md-input>
      </md-field>

      <div style="text-align: left">Order Type</div>
      <md-list>
        <md-list-item>
          <md-radio v-model="isSellOrder" value="1">Sell Order</md-radio>
        </md-list-item>
        <md-list-item>
          <md-radio v-model="isSellOrder" value="0">Buy Order</md-radio>
        </md-list-item>
      </md-list>

      <md-field>
        <label>Amount</label>
        <md-input v-model="makerAmount" type="text" value="1000" />
      </md-field>

      <md-field>
        <label>Price</label>
        <md-input v-model="makerPrice" type="text" value="100" />
      </md-field>

      <md-list>
        <md-list-item>Order Fill option</md-list-item>
        <md-list-item>
          <md-radio v-model="isPartialFillable" value="1">Allow partial order fill</md-radio>
        </md-list-item>
        <md-list-item>
          <md-radio v-model="isPartialFillable" value="0">Require full order fill</md-radio>
        </md-list-item>
      </md-list>

      <div>
        <div>Order lifetime</div>
        <md-radio v-model="lifetime" value="300">5 min</md-radio>
        <md-radio v-model="lifetime" value="1800">30 min</md-radio>
        <md-radio v-model="lifetime" value="604800">1 week</md-radio>
      </div> -->

      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>OTC Order Created</md-dialog-title>
        <md-divider />
        <div>
          <md-content>
            <code style="white-space: pre-line">{{ jsonOrder }}</code>
          </md-content>
        </div>
        <md-divider />

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        </md-dialog-actions>
      </md-dialog>

      <!-- Button -->
      <md-field>
        <md-button class="md-raised" v-on:click="createOrder">Create Order</md-button>
        <md-button class="md-raised md-accent" v-on:click="signOrder">Sign Order</md-button>
      </md-field>
    </md-app-content>
  </md-app>
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

      var order = {
        token: this.tokenaddress,
        price: this.makerPrice,
        amount: this.makerAmount,
        isSellOrder: this.isSellOrder,
        partialFillAllowed: this.isPartialFillable,
        ttl: ttl,
        // ttl: 2164596577,
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
