<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="grey--text" />
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light white--text">DEX3 - Simple, Fast, Reliable</span>
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    drawer: null,
    links: [
      {icon: "mdi-cloud-upload", text: "Create Order", route: "/"},
      {icon: "mdi-cloud-download", text: "Fill Order", route: "/fill-order"},
    ]
  })
};
</script>
