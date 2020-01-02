<template>
  <div>
    <v-simple-table>
      <tbody>
        <tr>
          <td style="width:100%;">
            <v-input v-model="tokenaddress" placeholder="0x..."></v-input>
            <v-text-field v-model="tokenaddress" label="Token address 0x..." required></v-text-field>
          </td>
          <td>
            <v-btn
              small
              class="mx-2"
              fab
              color="indigo"
              v-on:click="onSubmit"
              :disabled="tokenaddress === ''"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>
<script>

export default {
  data() {
    return {
      tokenaddress: ''
    };
  },
  methods: {
    async onSubmit() {
      console.log("info:", this.tokenaddress);

      this.$emit("tokenaddress-submitted", this.tokenaddress);
      this.tokenaddress = '';
    }
  }
};
</script>
