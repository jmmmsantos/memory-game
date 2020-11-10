<template>
  <v-container class="d-flex justify-center align-center pa-0">
    <v-card
      color="grey darken-4"
      dark
      elevation="12"
      min-width="260px"
      :width="$vuetify.breakpoint.width <= 1024 ? '100vw' : '50vw'"
      max-width="100vw"
      height="97vh"
    >
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="grey darken-4"
            dark
            absolute
            top
            left
            icon
            v-bind="attrs"
            v-on="on"
            @click="resetGame()"
          >
            <v-icon>{{ mdiRefresh }}</v-icon>
          </v-btn>
        </template>
        <span>Reset Game</span>
      </v-tooltip>
      <v-card-title
        v-if="$vuetify.breakpoint.smAndDown"
        class="bg--yellow--accent text-center justify-center black--text headline font-weight-light"
        >Memory Game</v-card-title
      >
      <v-card-title
        v-else
        class="bg--yellow--accent text-center justify-center black--text display-1 font-weight-light"
        >Memory Game</v-card-title
      >
      <v-card-text
        v-if="$vuetify.breakpoint.smAndDown"
        class="d-flex flex-row py-2"
      >
        <h1
          class="font-weight-thin body-2 white--text
              "
        >
          Attempts: {{ numberOfAttempts }}
        </h1>
        <v-spacer></v-spacer>
        <h1
          class="font-weight-thin body-2 white--text
              "
        >
          Time: {{ formattedElapsedTime }}
        </h1>
        <v-spacer></v-spacer>
        <h1
          class="font-weight-thin body-2 white--text
              "
        >
          {{ numberOfPairs }} pair/s left
        </h1>
      </v-card-text>
      <v-card-text v-else class="d-flex flex-row pt-2">
        <h1
          class="font-weight-thin headline white--text
              "
        >
          Attempts: {{ numberOfAttempts }}
        </h1>
        <v-spacer></v-spacer>
        <h1
          class="font-weight-thin headline white--text
              "
        >
          Time: {{ formattedElapsedTime }}
        </h1>
        <v-spacer></v-spacer>
        <h1
          class="font-weight-thin headline white--text
              "
        >
          {{ numberOfPairs }} pair/s left
        </h1>
      </v-card-text>
      <v-divider class="mx-3"></v-divider>
      <v-card-text class="d-flex justify-center py-0">
        <v-sheet color="grey darken-4" min-width="260px" width="100vw">
          <v-row justify="center" align="center" align-content="center">
            <v-col
              class="d-flex justify-center"
              cols="3"
              v-for="(item, i) in items"
              :key="'flipper_' + i"
            >
              <flipper
                class="d-inline-block"
                height="11.5vh"
                width="11.5vh"
                :flipped="!item.state"
                @click="onClick(item)"
                v-if="!item.checked"
              >
                <v-card color="yellow" elevation="16" slot="front">
                  <v-card-text class="d-flex justify-center pa-0">
                    <v-sheet
                      class="flex-fill pa-0 ma-0"
                      :color="item.color"
                      height="11.5vh"
                      width="11.5vh"
                    ></v-sheet>
                  </v-card-text>
                </v-card>
                <v-card slot="back" elevation="16">
                  <v-card-text class="pa-0">
                    <v-img
                      :src="cardBackImage"
                      height="11.5vh"
                      width="11.5vh"
                      aspect-ratio="1"
                    ></v-img>
                  </v-card-text>
                </v-card>
              </flipper>
              <v-card
                height="11.5vh"
                width="11.5vh"
                flat
                tile
                color="transparent"
                v-else
              ></v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mdiRefresh } from "@mdi/js";
import Flipper from "vue-flipper";

export default {
  name: "GameWindow",

  components: {
    Flipper,
  },

  data: () => ({
    //
    mdiRefresh,
    itemList: null,
    selection: [],
    selected: null,
    numberOfPairs: 0,
    numberOfAttempts: 0,
    elapsedTime: 0,
    timer: undefined,
    cardBackImage: require("../assets/back.png"),
  }),

  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") + 1, 5);
    },

    items() {
      return this.itemList;
    },
  },

  methods: {
    onClick(item) {
      if (!this.timer) this.start();
      if (this.isAlreadyActive(item)) return;
      this.selected = item;
      this.showCard(item);
      this.selection.push(this.selected);
      if (this.selection.length === 2) {
        this.compareSelection();
        this.incrementAttempts();
      }

      if (this.selection.length > 2) {
        this.resetSelection();
      }

      if (this.gameIsFinished()) {
        this.stop();
        window.setTimeout(() => {
          this.$emit(
            "finished",
            this.numberOfAttempts,
            this.formattedElapsedTime
          );
        }, 1000);
      }
    },

    showCard(item) {
      this.itemList.find((index) => {
        if (index.pos === item.pos) {
          index.state = true;
        }
      });
    },

    isAlreadyActive(item) {
      return item.state;
    },

    compareSelection() {
      if (this.selectionDoesMatch()) {
        for (let i = 0; i < this.selection.length; i++) {
          this.itemList.find((item) => {
            if (item.pos === this.selection[i].pos) {
              this.hideBlock(item);
            }
          });
        }
        this.numberOfPairs -= 1;
        this.clearSelection();
      }
    },

    hideBlock(item) {
      window.setTimeout(() => {
        item.checked = true;
      }, 1000);
    },

    gameIsFinished() {
      return this.numberOfPairs === 0;
    },

    resetSelection() {
      for (let i = 0; i < this.selection.length - 1; i++) {
        this.itemList.find((item) => {
          if (item.pos === this.selection[i].pos) {
            item.state = false;
          }
        });
      }
      this.clearSelection();
      this.selection.push(this.selected);
    },

    incrementAttempts() {
      this.numberOfAttempts += 1;
    },

    clearSelection() {
      this.selection = [];
    },

    selectionDoesMatch() {
      return this.selection[0].val === this.selection[1].val;
    },

    initialize() {
      this.getItemList();
    },

    getItemList() {
      this.itemList = require("../assets/script");
      this.numberOfPairs = this.itemList.length / 2;
    },

    resetGame() {
      location.reload();
      return false;
    },

    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },

    stop() {
      clearInterval(this.timer);
    },

    reset() {
      this.elapsedTime = 0;
    },
  },

  created() {
    this.initialize();
  },
};
</script>
