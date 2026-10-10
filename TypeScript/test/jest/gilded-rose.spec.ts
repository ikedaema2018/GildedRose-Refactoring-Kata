import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('conjured items degrade in quality twice as fast', () => {
    const gildedRose = new GildedRose([Item.createItem('Conjured Mana Cake', 3, 6), Item.createItem('Conjured Mana Cake', 1, 11)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Conjured Mana Cake');
    expect(items[0].quality).toBe(4);
    expect(items[0].sellIn).toBe(2);
    expect(items[1].name).toBe('Conjured Mana Cake');
    expect(items[1].quality).toBe(9);
    expect(items[1].sellIn).toBe(0);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Conjured Mana Cake');
    expect(items[0].quality).toBe(2);
    expect(items[0].sellIn).toBe(1);
    expect(items[1].name).toBe('Conjured Mana Cake');
    expect(items[1].quality).toBe(5);
    expect(items[1].sellIn).toBe(-1);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Conjured Mana Cake');
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(0);
    expect(items[1].name).toBe('Conjured Mana Cake');
    expect(items[1].quality).toBe(1);
    expect(items[1].sellIn).toBe(-2);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Conjured Mana Cake');
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
    expect(items[1].name).toBe('Conjured Mana Cake');
    expect(items[1].quality).toBe(0);
    expect(items[1].sellIn).toBe(-3);
  });
});
