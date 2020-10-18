<template>
  <v-container fluid>
    <h1>{{ numberOfPairs }} pair/s left</h1>
    <h1>Number of attempts: {{ numberOfAttempts }}</h1>
    <h1>Time: {{ formattedElapsedTime }}</h1>
    <v-btn @click="resetGame()">Reset</v-btn>
    <v-row justify="center" align="center" align-content="center">
      <v-col
        class="d-flex justify-center ma-5"
        cols="2"
        v-for="item in items"
        :key="item"
      >
        <flipper
          class="d-inline ma-5"
          :flipped="!item.state"
          @click="onClick(item)"
        >
          <v-card slot="front">
            <v-card-text>
              {{ item.val }}
            </v-card-text>
          </v-card>
          <v-card slot="back">
            <v-card-text class="pa-0">
              <v-img :src="cardBackImage" contain></v-img>
            </v-card-text>
          </v-card>
        </flipper>
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

      if (this.gameIsFinished()) this.stop();
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
