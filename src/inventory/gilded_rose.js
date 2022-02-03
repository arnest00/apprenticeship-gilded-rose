// Item constructor. DO NOT MODIFY OR THE GOBLIN WILL EAT YOU!
export function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

/*
* Update inventory
* @param {Item[]} items - an array of Items representing the inventory to be updated
* Example usage:

const items = [
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Conjured Mana Cake', 3, 6),
];

updateQuality(items);
*/
const LEGENDARY_ITEMS = ['Sulfuras, Hand of Ragnaros']
const SPECIAL_ITEMS = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert'];

const incrementQuality = (item, incrementation = 1) => item.quality = item.quality + incrementation

const decrementQuality = (item, decrementation = 1) => {
  let newValue = item.quality - decrementation

  if (newValue < 0) {
    newValue = 0
    return
  }

  item.quality = newValue
}

const checkNormalItems = item => {
  if (item.sell_in < 0) {
    decrementQuality(item, 2)
    return
  }
  decrementQuality(item)
}

const checkSpecialItems = item => {
  if (item.quality < 50) {
    if (item.name === 'Aged Brie')
      incrementQuality(item, 2)

    if (item.name == 'Backstage passes to a TAFKAL80ETC concert')
      switch(true) {
        case item.sell_in < 0:
          item.quality = 0;
        break;
        case item.sell_in < 5:
          incrementQuality(item, 3)
        break;
        case item.sell_in < 10:
          incrementQuality(item, 2);
        break;
        default:
          incrementQuality(item);
        break;
      }
  }
}

const checkLegendaryItems = item => {
  item.quality = item.quality
}

export function updateQuality(items) {
  for (var i = 0; i < items.length; i++) {
    if (!LEGENDARY_ITEMS.includes(items[i].name)) {
      items[i].sell_in = items[i].sell_in - 1;
    }

    if (SPECIAL_ITEMS.includes(items[i].name))
      checkSpecialItems(items[i])

    else if (LEGENDARY_ITEMS.includes(items[i].name))
      checkLegendaryItems(items[i])
      
    else checkNormalItems(items[i])
  }
}
