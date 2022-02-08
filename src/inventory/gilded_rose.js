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
const MAX_QUALITY = 50
const MIN_QUALITY = 0

const modifyQuality = (item, modification) => {
  let newValue = item.quality + modification
  if (newValue > MAX_QUALITY) {
    newValue = MAX_QUALITY
    return
  }
  if (newValue < MIN_QUALITY) {
    newValue = MIN_QUALITY
    return
  }
  item.quality = newValue;
}

const checkNormalItems = item => {
  if (item.sell_in < 0) {
    modifyQuality(item, -2)
    return
  }
  modifyQuality(item, -1)
}

const checkSpecialItems = item => {
  if (item.name === 'Aged Brie')
    item.sell_in < 0 ? modifyQuality(item, 2) : modifyQuality(item, 1)
  if (item.name == 'Backstage passes to a TAFKAL80ETC concert')
    switch(true) {
      case item.sell_in < 0:
        item.quality = 0;
      break;
      case item.sell_in < 5:
        modifyQuality(item, 3)
      break;
      case item.sell_in < 10:
        modifyQuality(item, 2)
      break;
      default:
        modifyQuality(item, 1)
      break;
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
