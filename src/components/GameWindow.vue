<template>
  <v-container class="d-flex" fluid>
    <v-row>
      <v-col cols="5" class="pt-10 d-flex justify-center align-center">
        <v-container fluid>
          <v-card class="ml-16">
            <v-card-title
              class="bg--yellow--accent text-center justify-center white--text display-1 font-weight-light"
              >Memory Game</v-card-title
            >
            <v-card-text class="d-flex flex-row pt-3 black--text">
              <h1
                class="title-1 font-weight-light
              "
              >
                Time: {{ formattedElapsedTime }}
              </h1>
              <v-spacer></v-spacer>
              <h1
                class="title-1 font-weight-light
              "
              >
                {{ numberOfPairs }} pair/s left
              </h1>
            </v-card-text>
            <v-card-text class="black--text d-flex justify-center">
              <h1
                class="title-1 font-weight-light
              "
              >
                Attempts: {{ numberOfAttempts }}
              </h1>
            </v-card-text>
            <v-divider class="mx-5"></v-divider>
            <v-card-actions class="d-flex justify-center">
              <v-btn outlined color="#ffd700" @click="resetGame()">Reset</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-col>
      <v-col class="pt-0">
        <v-sheet class="mr-16">
          <v-row
            class="ml-16"
            justify="center"
            align="center"
            align-content="center"
          >
            <v-col
              class="d-flex justify-center my-5"
              cols="3"
              v-for="(item, i) in items"
              :key="'flipper_' + i"
            >
              <flipper
                class="d-inline-block my-5"
                :flipped="!item.state"
                @click="onClick(item)"
              >
                <v-card color="yellow" elevation="10" slot="front">
                  <v-card-text class="d-flex justify-center pa-0">
                    <v-sheet
                      class="flex-fill pa-0 ma-0"
                      :color="item.color"
                      height="11.5vh"
                    ></v-sheet>
                  </v-card-text>
                </v-card>
                <v-card slot="back" elevation="10">
                  <v-card-text class="pa-0">
                    <v-img :src="cardBackImage" contain></v-img>
                  </v-card-text>
                </v-card>
              </flipper>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Flipper from "vue-flipper";

export default {
  name: "GameWindow",

  components: {
    Flipper,
  },

  data: () => ({
    //
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
              item.checked = true;
            }
          });
        }
        this.numberOfPairs -= 1;
        this.clearSelection();
      }
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
