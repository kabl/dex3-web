<template>
  <div>
    <v-simple-table>
      <tbody>
      <tr>
        <td>
          <div style="text-align: left">Token Address</div>
        </td>
        <td style="width:100%;">
            <v-input v-model="tokenaddress" placeholder="0x..."></v-input>
        </td>
        <td>
          <v-btn class="v-fab v-mini v-primary" v-on:click="onSubmit" :disabled="tokenaddress == null"><v-icon>add</v-icon></v-btn>  
        </td>
      </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>
<script>
import blockchain from "../js/blockchainInterface";

export default {
  data() {
    return {
      tokenaddress: null
    };
  },
  methods: {
    async onSubmit() {
      // var web3 = blockchain.getWeb3();
      blockchain.showMessage();
      var info = await blockchain.getPersonalTokenInfo(this.tokenaddress);
      console.log("info:", info);

      this.$emit("tokenaddress-submitted", info);
      this.tokenaddress = null;
    }
  }
};
</script>
