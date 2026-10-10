import { Item, GildedRose } from '../app/gilded-rose';

console.log("OMGHAI!")

const items = [
  Item.createItem("+5 Dexterity Vest", 10, 20), //
  Item.createItem("Aged Brie", 2, 0), //
  Item.createItem("Elixir of the Mongoose", 5, 7), //
  Item.createItem("Sulfuras, Hand of Ragnaros", 0, 80), //
  Item.createItem("Sulfuras, Hand of Ragnaros", -1, 80),
  Item.createItem("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  Item.createItem("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  Item.createItem("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  // this conjured item does not work properly yet
  Item.createItem("Conjured Mana Cake", 3, 6)];


const gildedRose = new GildedRose(items);

let days: number = 2;
if (process.argv.length > 2) {
    days = +process.argv[2];
  }

for (let i = 0; i < days + 1; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach(element => {
    console.log(element.name + ', ' + element.sellIn + ', ' + element.quality);

  });
  console.log();
  gildedRose.updateQuality();
}
