<template>
  <div>
    <div>
      <label for="signedOrder">Signed Maker Order</label>
      <textarea v-model="signedOrder" id="signedOrder" type="text" />
    </div>

    <div>
      <label for="takerAmount">Taker Amount</label>
      <input v-model="takerAmount" id="takerAmount" type="text" value="100" />
    </div>

    <div>
      <label>Create data</label>
      <div>
        <button v-on:click="fillOrder">Fill Order</button>
      </div>
    </div>
  </div>
</template>

<script>
import blockchain from "../js/blockchainInterface";

export default {
  data() {
    return {
      signedOrder: null,
      takerAmount: null
    };
  },
  methods: {
    async fillOrder() {
      console.log("Fill Order clicked");
      await blockchain.fillOrder(this.signedOrder, this.takerAmount);
    }
  }
};
</script>
