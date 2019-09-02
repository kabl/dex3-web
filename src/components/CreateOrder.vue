<template>
  <div>
    <div>
      <label for="tokenAddress">Token Address</label>
      <input v-model="tokenaddress" id="tokenAddress" type="text" placeholder="0x..." />
    </div>

    <div>
      <label for="makerPrice">Price</label>
      <input v-model="makerPrice" id="makerPrice" type="text" value="100" />
    </div>

    <div>
      <label for="makerAmount">Amount</label>
      <input v-model="makerAmount" id="makerAmount" type="text" value="1000" />
    </div>

    <div>
      <label for="orderType">Order Type</label>
      <div>
        <div>
          <label>
            <input type="radio" id="orderType-0" value="1" checked="checked" v-model="isSellOrder" />
            Sell Order
          </label>
        </div>
        <div>
          <label>
            <input type="radio" id="orderType-1" value="0" v-model="isSellOrder" />
            Buy Order
          </label>
        </div>
      </div>
    </div>

    <div>
      <label for="fillable">Order Fill option</label>
      <div>
        <div>
          <label>
            <input
              type="radio"
              id="fillable-0"
              value="1"
              checked="checked"
              v-model="isPartialFillable"
            />
            Allow partial order fill
          </label>
        </div>
        <div>
          <label>
            <input type="radio" id="fillable-1" value="0" v-model="isPartialFillable" />
            Require full order fill
          </label>
        </div>
      </div>
    </div>

    <!-- working here -->
    <div>
      <label for="lifetime">Order lifetime</label>
      <div>
        <div>
          <label>
            <input type="radio" id="lifetime-0" value="300" checked="checked" v-model="lifetime" />
            5 min
          </label>
        </div>
        <div>
          <label>
            <input type="radio" id="lifetime-1" value="1800" v-model="lifetime" />
            30 min
          </label>
        </div>
        <div>
          <label>
            <input type="radio" id="lifetime-2" value="604800" v-model="lifetime" />
            1 week
          </label>
        </div>
      </div>
    </div>

    <!-- Button -->
    <div>
      <label for="signBtn">Create data</label>
      <div>
        <!-- <button type="button" onclick="init()" class="btn btn-secondary">Init</button> -->
        <!-- <button type="button" onclick="createOrder()" class="btn btn-success">Create</button> -->
        <!-- <button type="button" onclick="signOrder()" class="btn btn-warning">Sign</button> -->
        <button v-on:click="createOrder">Create Order</button>
        <button v-on:click="signOrder">Sign Order</button>
      </div>
    </div>
  </div>
</template>

<script>
import blockchain from "../js/blockchainInterface";

export default {
  data() {
    return {
      tokenaddress: "0x32b042393AA19A5391ABDC96AA09D7bA2C9D8a5e",
      makerPrice: 100,
      makerAmount: 1000,
      isSellOrder: 1,
      isPartialFillable: 1,
      lifetime: 604800
    };
  },
  methods: {
    async createOrder() {
      console.log("Create order clicked");

      var ttl = Math.floor(Date.now() / 1000);
      ttl = ttl + parseInt(this.lifetime, 10);

      var order = {
        token: this.tokenaddress,
        price: parseInt(this.makerPrice, 10),
        amount: parseInt(this.makerAmount, 10),
        isSellOrder: this.isSellOrder,
        partialFillAllowed: this.isPartialFillable,
        // ttl: ttl,
        ttl: 2164596577,
        hash: undefined,
        sig: undefined
      };

      order.hash = await blockchain.calcHash(order);
      var jsonOrder = JSON.stringify(order, null, 2);
      console.log("Order:", jsonOrder);
      return order;
    },
    async signOrder() {
      var order = await this.createOrder();
      order.sig = await blockchain.signHash(order.hash);
      var jsonOrder = JSON.stringify(order, null, 2);
      console.log("Signed Order:", jsonOrder);
    }
  }
};
</script>
