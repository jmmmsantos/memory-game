const items = [
  {
    val: 1,
    count: 0,
  },
  {
    val: 2,
    count: 0,
  },
  {
    val: 3,
    count: 0,
  },
  {
    val: 4,
    count: 0,
  },
  {
    val: 5,
    count: 0,
  },
  {
    val: 6,
    count: 0,
  },
  {
    val: 7,
    count: 0,
  },
  {
    val: 8,
    count: 0,
  },
  {
    val: 9,
    count: 0,
  },
  {
    val: 10,
    count: 0,
  },
];
const itemPool = [];
for (let i = 0; i < items.length * 2; i++) {
  itemPool.push({
    pos: i + 1,
    val: null,
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
            const { val } = index;
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
