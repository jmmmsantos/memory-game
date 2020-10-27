const items = [
  {
    val: 1,
    count: 0,
    color: "blue",
  },
  {
    val: 2,
    count: 0,
    color: "red",
  },
  {
    val: 3,
    count: 0,
    color: "green",
  },
  {
    val: 4,
    count: 0,
    color: "orange",
  },
  {
    val: 5,
    count: 0,
    color: "purple",
  },
  {
    val: 6,
    count: 0,
    color: "yellow",
  },
  {
    val: 7,
    count: 0,
    color: "black",
  },
  {
    val: 8,
    count: 0,
    color: "white",
  },
  {
    val: 9,
    count: 0,
    color: "pink",
  },
  {
    val: 10,
    count: 0,
    color: "grey",
  },
];
const itemPool = [];
for (let i = 0; i < items.length * 2; i++) {
  itemPool.push({
    pos: i + 1,
    val: null,
    color: null,
    state: false,
    checked: false,
  });
}
let counter = 0;
while (counter != itemPool.length) {
  let item = (Math.random() * (items.length - 0 + 1)) << 0;
  items.find((index) => {
    if (index.val === item) {
      if (index.count < 2) {
        itemPool.find((i) => {
          if (i.pos === counter + 1) {
            const { val, color } = index;
            i.color = color;
            i.val = val;
          }
        });
        index.count += 1;
        counter++;
      }
    }
  });
}

module.exports = itemPool;
