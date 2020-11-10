<template>
  <v-app>
    <v-main>
      <v-dialog v-model="startDialog" max-width="450" persistent dark>
        <v-card dark color="grey darken-4">
          <v-card-title
            class="display-1 pa-5 text--yellow--accent font-weight-light justify-center"
          >
            Welcome!
          </v-card-title>

          <v-card-text class="text-center">
            <h1 class="body-1 white--text">
              Find the corresponding pair of each card that matches its color to
              complete the game. Timer starts once you select a card.
            </h1>
            <h1 class="body-1 pt-3 white--text text-center">Goodluck!</h1>
          </v-card-text>

          <v-card-actions class="justify-center pb-5">
            <v-btn color="#f7ef64" outlined @click="startGame()">
              Play Game!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="endDialog" max-width="450" persistent>
        <v-card dark color="grey darken-4">
          <v-card-title
            class="display-1 pa-5 text--yellow--accent font-weight-light justify-center"
          >
            Congratulations!
          </v-card-title>

          <v-card-text class="text-center px-3">
            <h1 class="body-1 white--text">
              You finished the game under {{ this.time }} and with just
              {{ this.attempts }} attempts!
            </h1>
          </v-card-text>

          <v-card-actions class="justify-center px-3">
            <v-btn color="#f7ef64" outlined @click="resetGame()">
              Play Again!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-container fluid v-show="gameWindow">
        <GameWindow @finished="onFinished" />
      </v-container>
      <v-overlay class="d-flex flex-column" :opacity="1" :value="overlay">
        <div class="d-flex justify-center">
          <v-progress-circular
            indeterminate
            size="64"
            color="#f7ef64"
          ></v-progress-circular>
        </div>
        <h1 class="font-weight-light py-5">
          Now Loading...
        </h1>
      </v-overlay>
    </v-main>
  </v-app>
</template>

<script>
import GameWindow from "./components/GameWindow";

export default {
  name: "App",

  components: {
    GameWindow,
  },

  data: () => ({
    //
    startDialog: true,
    endDialog: false,
    overlay: false,
    gameWindow: false,
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

    startGame() {
      this.startDialog = false;
      this.overlay = true;
      window.setTimeout(() => {
        this.gameWindow = true;
      }, 500);
      window.setTimeout(() => {
        this.overlay = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1500);
    },
  },
};
</script>

<style>
.bg--yellow--accent {
  background-color: #f7ef64 !important;
}

.text--yellow--accent {
  color: rgb(247, 239, 100) !important;
}

.v-application.v-application--is-ltr.theme--light {
  background-color: #212121;
}

html,
.container {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

html {
  overflow: hidden;
  background-color: #212121;
}
</style>
