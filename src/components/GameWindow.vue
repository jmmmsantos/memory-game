<template>
  <v-container fluid>
    <h1>{{ numberOfPairs }} pair/s left</h1>
    <h1>Number of attempts: {{ numberOfAttempts }}</h1>
    <v-row justify="center" align="center" align-content="center">
      <v-col cols="3" class="pb-5" v-for="item in itemList" :key="item">
        <flipper :flipped="!item.state" @click="onClick(item)">
          <v-card slot="front">
            {{ item.val }}
          </v-card>

          <v-card slot="back">Backface</v-card>
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
  }),

  methods: {
    onClick(item) {
      if (this.isAlreadyActive(item)) return;
      this.selected = item;
      this.showCard(item);
      this.selection.push(this.selected);
      if (this.selection.length === 2) {
        this.compareSelection();
      } else if (this.selection.length > 2) {
        this.resetSelection();
      }
    },

    isNotYetChecked() {},
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

    clearSelection() {
      this.numberOfAttempts += 1;
      this.selection = [];
    },

    selectionDoesMatch() {
      return this.selection[0].val === this.selection[1].val;
    },

    initialize() {
      this.itemList = require("../assets/script");
      this.numberOfPairs = this.itemList.length / 2;
    },
  },

  created() {
    this.initialize();
  },
};
</script>
