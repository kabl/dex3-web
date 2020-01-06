<template>
  <v-card>
    <v-card-title>{{ token.name }} - {{ token.symbol }}</v-card-title>
    <v-card-subtitle>{{ token.address }}</v-card-subtitle>
    <v-card-text>
      <v-simple-table dense>
        <tbody>
          <tr>
            <td>Balance</td>
            <!-- <td>{{ token.balance }}</td> -->
            <td>{{ token.balanceHumanReadable }}</td>
            <td></td>
          </tr>
          <tr>
            <td>DEX Allowance</td>
            <td>{{ token.dexAllowanceHumanReadable }}</td>
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
    token: {
      type: Object,
      required: true
    }
  },
  created: async function() {
    this.interval = setInterval(this.refresh, 20000);
  },
  methods: {
    async dexAllow() {
      await blockchain.dexAllow(this.token.address, this.token.balance);
      await this.refresh();
    },
    async dexDeny() {
      await blockchain.dexDeny(this.token.address);
      await this.refresh();
    },
    async refresh() {
      this.$store.dispatch("updateToken", this.token.address);
    }
  }
};
</script>