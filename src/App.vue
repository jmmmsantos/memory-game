<template>
  <v-app>
    <v-main>
      <v-dialog
        v-model="startDialog"
        v-if="!$vuetify.breakpoint.mobile"
        max-width="290"
        persistent
      >
        <v-card>
          <v-card-title class="headline justify-center">
            Welcome!
          </v-card-title>

          <v-card-text class="text-center px-3">
            <h1 class="body-1">
              Find the corresponding pair of each card that matches its color to
              complete the game. Timer starts once you select a card.
            </h1>
            <h1 class="body-1 pt-5 text-center">Goodluck!</h1>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="#ffd700" outlined @click="startDialog = false">
              Play Game!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="endDialog" max-width="290" persistent>
        <v-card>
          <v-card-title class="headline justify-center">
            Congratulations!
          </v-card-title>

          <v-card-text class="text-center px-3">
            <h1 class="body-1">
              You finished the game under {{ this.time }} and with just
              {{ this.attempts }} attempts!
            </h1>
          </v-card-text>

          <v-card-actions class="justify-center px-3">
            <v-btn color="#ffd700" outlined @click="resetGame()">
              Play Again!
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="grey" outlined @click="closeGame()">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-container fluid class="pa-0" v-if="$vuetify.breakpoint.mobile">
        <UnderConstruction />
      </v-container>
      <v-container fluid v-show="!startDialog">
        <GameWindow @finished="onFinished" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GameWindow from "./components/GameWindow";
import UnderConstruction from "./components/UnderConstruction";

export default {
  name: "App",

  components: {
    GameWindow,
    UnderConstruction,
  },

  data: () => ({
    //
    startDialog: true,
    endDialog: false,
    time: null,
    attempts: null,
  }),

  methods: {
    onFinished(numberOfAttempts, formattedElapsedTime) {
      this.time = formattedElapsedTime;
      this.attempts = numberOfAttempts;
      this.endDialog = true;
    },

    resetGame() {
      location.reload();
      return false;
    },

    closeGame() {
      window.close();
      return false;
    },
  },
};
</script>

<style>
.bg--yellow--accent {
  background-color: #ffd700 !important;
}

.container {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>
