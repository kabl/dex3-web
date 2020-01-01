<template>
  <v-card>
    <v-card-title>{{ erc20Token.name }} / {{ erc20Token.symbol }}</v-card-title>
    <v-card-subtitle>{{ erc20Token.address }}</v-card-subtitle>
    <v-card-text>
      <v-simple-table dense>
        <tbody>
          <tr>
            <td>Balance</td>
            <!-- <td>{{ erc20Token.balance }}</td> -->
            <td>{{ erc20Token.balanceHumanReadable }}</td>
            <td></td>
          </tr>
          <tr>
            <td>DEX Allowance</td>
            <td>{{ erc20Token.dexAllowanceHumanReadable }}</td>
            <td>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn text icon color="primary" v-on="on">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn color="primary" v-on:click="dexAllow" small block>DEX Allow</v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn color="primary" v-on:click="dexDeny" small block>DEX Deny</v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import blockchain from "../js/blockchainInterface";

export default {
  props: {
    tokenAddress: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      erc20Token: {}
    };
  },
  computed: {
    tokenValue: function() {
      return "OK";
    }
  },
  created: async function() {
    await this.refresh();
    this.interval = setInterval(this.refresh, 2000);
  },
  methods: {
    async dexAllow() {
      await blockchain.dexAllow(
        this.erc20Token.address,
        this.erc20Token.balance
      );
      await this.refresh();
    },
    async dexDeny() {
      await blockchain.dexDeny(this.erc20Token.address);
      await this.refresh();
    },
    async refresh() {
      this.erc20Token = await blockchain.getPersonalTokenInfo(
        this.tokenAddress
      );
    }
  }
};
</script>