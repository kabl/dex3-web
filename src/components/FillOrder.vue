<template>
  <md-app>
    <md-app-toolbar class="md-title">Market Taker - Fill Order</md-app-toolbar>
    <md-app-content>
      <md-field>
        <label>Signed Maker Order</label>
        <md-textarea v-model="signedOrder" type="text"></md-textarea>
      </md-field>

      <md-field>
        <md-button class="md-raised md-primary" v-on:click="validateOrder">Validate Order</md-button>
      </md-field>

      <OrderDetails v-if="erc20Token" :order="order" :erc20Token="erc20Token"></OrderDetails>

      <md-field v-if="erc20Token">
        <label>Taker Amount</label>
        <md-input v-model="takerAmount" type="number" min="1"></md-input>
      </md-field>

      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>OTC Order Created</md-dialog-title>
        <md-divider />
        <div>
          <md-content>
            <span
              class="md-display-1"
            >You are about to {{orderActionTaker}} {{takerAmount}} {{erc20Symbol}} Token for {{priceToPay}} WETH</span>
          </md-content>
        </div>
        <md-divider />

        <md-dialog-actions>
          <md-button class="md-raised md-primary" @click="showDialog = false">Abort</md-button>
          <md-button class="md-raised md-accent" v-on:click="fillOrder">Submit Fill Order</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-field>
        <md-button
          class="md-raised md-primary"
          :disabled="order == null"
          @click="showDialog = true"
        >Prepare Fill Order</md-button>
      </md-field>
    </md-app-content>
  </md-app>
</template>

<script>
import blockchain from "../js/blockchainInterface";
import OrderDetails from "./OrderDetails.vue";
import { BigNumber } from 'ethers/utils';

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
