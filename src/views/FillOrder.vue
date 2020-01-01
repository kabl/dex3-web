<template>
  <div>
    <v-card class="mx-auto" max-width="500">
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>Fill Order (Market Taker)</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-container fluid>
        <v-row>
          <v-col cols="12" md="12">
            <v-textarea outlined name="input-7-4" label="Signed Order JSON" v-model="signedOrder"></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-btn v-on:click="validateOrder" block color="primary">Validate Order</v-btn>
          </v-col>
        </v-row>
        <v-row v-if="erc20Token">
          <v-col cols="12" md="12">
            <OrderDetails :order="order" :erc20Token="erc20Token"></OrderDetails>
          </v-col>
        </v-row>
        <v-row v-if="erc20Token">
          <v-col cols="12" md="12">
            <v-text-field v-model="takerAmount" label="Taker Amount" type="number" min="1" required></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="erc20Token">
          <v-col
            cols="12"
            md="12"
          >You are about to {{orderActionTaker}} {{takerAmount}} {{erc20Symbol}} Token for {{priceToPay}} WETH</v-col>
        </v-row>
        <v-row v-if="erc20Token">
          <v-btn
            color="primary"
            block
            :disabled="order == null"
            @click.stop="dialog = true"
          >Prepare Fill Order</v-btn>
        </v-row>
      </v-container>
    </v-card>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline grey lighten-2"
          primary-title>OTC Order Created</v-card-title>
        <v-spacer></v-spacer>

        <v-card-text>You are about to {{orderActionTaker}} {{takerAmount}} {{erc20Symbol}} Token for {{priceToPay}} WETH</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Abort</v-btn>
          <v-btn color="error" v-on:click="fillOrder">Submit Fill Order</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import blockchain from "../js/blockchainInterface";
import OrderDetails from "../components/OrderDetails.vue";
const BigNumber = require("bignumber.js");

export default {
  components: {
    OrderDetails
  },
  data() {
    return {
      signedOrder: "",
      takerAmount: 1,
      order: null,
      erc20Token: null,
      dialog: false
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
      const price = new BigNumber(this.order.price);
      const amount = new BigNumber(this.order.amount);
      const takerAmount = new BigNumber(this.takerAmount);
      return price.multipliedBy(takerAmount).dividedBy(amount);
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
