<template>
  <div>
    <div>Market Taker - Fill Order</div>
    <div>
        <label>Signed Maker Order</label>
        <v-textarea v-model="signedOrder" type="text"></v-textarea>

        <v-btn class="v-raised v-primary" v-on:click="validateOrder">Validate Order</v-btn>

      <OrderDetails v-if="erc20Token" :order="order" :erc20Token="erc20Token"></OrderDetails>

      <div v-if="erc20Token">
        <label>Taker Amount</label>
        <v-input v-model="takerAmount" type="number" min="1"></v-input>
      </div>

      <v-dialog :v-active.sync="showDialog">
        <v-dialog-title>OTC Order Created</v-dialog-title>
        <v-divider />
        <div>
          <v-content>
            <span
              class="v-display-1"
            >You are about to {{orderActionTaker}} {{takerAmount}} {{erc20Symbol}} Token for {{priceToPay}} WETH</span>
          </v-content>
        </div>
        <v-divider />

        <v-dialog-actions>
          <v-btn class="v-raised v-primary" @click="showDialog = false">Abort</v-btn>
          <v-btn class="v-raised v-accent" v-on:click="fillOrder">Submit Fill Order</v-btn>
        </v-dialog-actions>
      </v-dialog>

        <v-btn
          class="v-raised v-primary"
          :disabled="order == null"
          @click="showDialog = true"
        >Prepare Fill Order</v-btn>
    </div>
  </div>
</template>

<script>
import blockchain from "../js/blockchainInterface";
import OrderDetails from "./OrderDetails.vue";
import Web3 from 'web3';

export default {
  components: {
    OrderDetails
  },
  data() {
    return {
      signedOrder: null,
      takerAmount: 1,
      order: null,
      erc20Token: null,
      showDialog: false
    };
  },
  computed: {
    orderActionTaker: function() {
      if (this.order === null) return "";
      if (this.order.isSellOrder == 0) return "Sell"; //TODO check for bug. maybe it's int not string
      if (this.order.isSellOrder == 1) return "Buy";
      return "Error OrderType";
    },
    erc20Symbol: function() {
      if (this.erc20Token == null) return "";
      else return this.erc20Token.symbol;
    },
    priceToPay: function() {
      if (this.order === null) return -1;
      var web3 = new Web3(window.ethereum || "ws://localhost:8545");
      const price = new web3.BigNumber(this.order.price);
      const amount = new web3.BigNumber(this.order.amount);
      const takerAmount = new web3.BigNumber(this.takerAmount);
      return price.mul(takerAmount).div(amount);
    }
  },
  methods: {
    async validateOrder() {
      this.order = JSON.parse(this.signedOrder);
      this.erc20Token = await blockchain.getPersonalTokenInfo(this.order.token);
      this.showDialog = false;
    },
    async fillOrder() {
      console.log("Fill Order clicked");
      const realTakerAmount = blockchain.toContractNumber(
        this.takerAmount,
        this.erc20Token.decimals
      );
      await blockchain.fillOrder(this.order, realTakerAmount);
      this.showDialog = false;
      // this.order = null;
    }
  }
};
</script>
