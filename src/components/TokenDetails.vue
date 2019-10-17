<template>
  <div>
    <p />
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">
          <div>
            {{ erc20Token.name }} / {{ erc20Token.symbol }}
          </div>
        </div>
        <div class="md-subhead">{{ erc20Token.address }}</div>
      </md-card-header>
      <md-card-content>
        <md-table>
          <md-table-row>
            <md-table-cell>Balance</md-table-cell>
            <!-- <md-table-cell>{{ erc20Token.balance }}</md-table-cell> -->
            <md-table-cell>{{ erc20Token.balanceHumanReadable }}</md-table-cell>            
            <md-table-cell></md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-cell>DEX Allowance</md-table-cell>
            <md-table-cell>{{ erc20Token.dexAllowanceHumanReadable }}</md-table-cell>
            <md-table-cell>
            <md-menu md-size="small">
              <md-button md-menu-trigger class="md-icon-button md-primary">
                <md-icon>edit</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item>
                  <md-button
                    md-menu-trigger
                    class="md-raised md-accent"
                    v-on:click="dexAllow"
                  >DEX Allow</md-button>
                </md-menu-item>
                <md-menu-item>
                  <md-button
                    md-menu-trigger
                    class="md-raised md-accent"
                    v-on:click="dexDeny"
                  >DEX Deny</md-button>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
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