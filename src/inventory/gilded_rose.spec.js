import { Item, updateQuality } from './gilded_rose';

describe('`updateQuality`', () => {
  it('decrements sell_in by 1 for a standard item', () => {
    const standardItem = new Item('Ragged Cloak', 10, 10);
    updateQuality([standardItem]);
    expect(standardItem.sell_in).toBe(9);
  });

  it('decrements quality by 2 for a standard item with negative sell_in', () => {
    const standardItem = new Item('Ragged Cloak', -1, 4);
    updateQuality([standardItem]);
    expect(standardItem.quality).toBe(2);
  });

  it('quality of any item is never negative', () => {
    const standardItem = new Item('Ragged Cloak', 10, 0);
    updateQuality([standardItem]);
    expect(standardItem.quality).toBe(0);
  });

  it('increments quality by 1 for Aged Brie with sell_in > 0', () => {
    const agedBrie = new Item('Aged Brie', 2, 0);
    updateQuality([agedBrie]);
    expect(agedBrie.quality).toBe(1);
  });

  it('quality of Aged Brie is never > 50', () => {
    const agedBrie = new Item('Aged Brie', 0, 50);
    updateQuality([agedBrie]);
    expect(agedBrie.quality).toBe(50);
  });

  it('quality of Sulfuras is always = 80', () => {
    const sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    updateQuality([sulfuras]);
    expect(sulfuras.quality).toBe(80);
  });

  it('increments quality by 1 for TAFKAL80ETC passes with sell_in > 10', () => {
    const passes = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20);
    updateQuality([passes]);
    expect(passes.quality).toBe(21);
  });

  it('increments quality by 2 for TAFKAL80ETC passes with sell_in < 10', () => {
    const passes = new Item('Backstage passes to a TAFKAL80ETC concert', 9, 20);
    updateQuality([passes]);
    expect(passes.quality).toBe(22);
  });

  it('increments quality by 3 for TAFKAL80ETC passes with sell_in < 5', () => {
    const passes = new Item('Backstage passes to a TAFKAL80ETC concert', 4, 20);
    updateQuality([passes]);
    expect(passes.quality).toBe(23);
  });

  it('sets quality to 0 for TAFKAL80ETC passes with sell_in < 0', () => {
    const passes = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20);
    updateQuality([passes]);
    expect(passes.quality).toBe(0);
  });

  it('incremenets quality by 2 for Aged Brie with sell_in < 0 and quality < 50', () => {
    const standardItem = new Item('Aged Brie', -5, 45);
    updateQuality([standardItem]);
    expect(standardItem.quality).toBe(47);
  });

  it('decrements quality by 2 for a conjured item with sell_in > 0', () => {
    const conjuredItem = new Item('Conjured Dagger', 10, 24);
    updateQuality([conjuredItem]);
    expect(conjuredItem.quality).toBe(22);
  });

  it('decrements quality by 4 for a conjured item with negative sell_in', () => {
    const conjuredItem = new Item('Conjured Dagger', -1, 12);
    updateQuality([conjuredItem]);
    expect(conjuredItem.quality).toBe(8);
  });
});
