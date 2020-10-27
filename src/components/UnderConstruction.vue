<template>
  <v-sheet
    height="100vh"
    class="d-flex align-center justify-center pa-0"
    color="#212121"
  >
    <v-card
      flat
      tile
      class="d-flex flex-column align-center pa-0"
      color="transparent"
    >
      <v-card-text class="d-flex justify-center">
        <v-avatar color="#f7ef64" size="120">
          <v-icon color="grey darken-4" size="96">{{ mdiTools }}</v-icon>
        </v-avatar>
      </v-card-text>
      <v-card-title
        class="display-1 font-weight-light text-break text-center text--yellow--accent"
        >Mobile Version Unavailable!</v-card-title
      >
      <v-card-text class="body-1 white--text text-center px-16">
        Mobile version of this app is still under construction. Please use a
        Desktop/PC to proceed.
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import { mdiTools } from "@mdi/js";

export default {
  name: "UnderConstruction",
  data: () => ({
    mdiTools,
  }),
};
</script>

<style>
.text--yellow--accent {
  color: #f7ef64 !important;
}
</style>
