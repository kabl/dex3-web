<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cloud-upload</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Create Order</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cloud-download</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Fill Order</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>DEX3 - Simple, Fast, Reliable</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <TokenContainer />

        <div>
          <div>Create or Fill Order</div>
          <div>
            <v-radio v-model="isMarketMaker" :value="true">Create a new Order</v-radio>
            <v-radio v-model="isMarketMaker" :value="false">Fill an existing Order</v-radio>
          </div>
        </div>

        <CreateOrder />
        <FillOrder />
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020 DigitalizeIT GmbH</span>
    </v-footer>
  </v-app>
</template>

<script>
import TokenContainer from "./components/TokenContainer.vue";
import CreateOrder from "./components/CreateOrder.vue";
import FillOrder from "./components/FillOrder.vue";

export default {
  name: "app",
  data() {
    return {
      isMarketMaker: true,
      drawer: null
    };
  },
  components: {
    TokenContainer,
    CreateOrder,
    FillOrder
  }
};
</script>
