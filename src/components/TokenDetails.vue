<template>
  <div>
    <v-card>
        <div class="v-title">
          <div>
            {{ erc20Token.name }} / {{ erc20Token.symbol }}
          </div>
        </div>
        <div class="v-subhead">{{ erc20Token.address }}</div>
        <v-simple-table>
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
            <v-menu >
              <v-btn v-menu-trigger >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-menu-content>
                <v-menu-item>
                  <v-btn
                    v-menu-trigger
                    class="v-raised v-accent"
                    v-on:click="dexAllow"
                  >DEX Allow</v-btn>
                </v-menu-item>
                <v-menu-item>
                  <v-btn
                    v-menu-trigger
                    class="v-raised v-accent"
                    v-on:click="dexDeny"
                  >DEX Deny</v-btn>
                </v-menu-item>
              </v-menu-content>
            </v-menu>
            </td>
          </tr>
          </tbody>
        </v-simple-table>
    </v-card>
  </div>
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