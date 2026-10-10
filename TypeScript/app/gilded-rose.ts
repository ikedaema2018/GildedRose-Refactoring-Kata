export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

abstract class ItemUpdater {
  item: Item;
  constructor(item: Item) {
    this.item = item;
  }
  abstract update(): void;

  protected increaseQuality(amount: number = 1) {
    this.item.quality = Math.min(50, this.item.quality + amount);
  }

  protected decreaseQuality(amount: number = 1) {
    this.item.quality = Math.max(0, this.item.quality - amount);
  }

  protected decreaseSellIn() {
    this.item.sellIn--;
  }
}

// factory
// subclasses
class NormalItemUpdater extends ItemUpdater {
  public update() {
    this.decreaseSellIn();
    this.decreaseQuality(this.item.sellIn < 0 ? 2 : 1);
  }
}

class AgedBrieItemUpdater extends ItemUpdater {
  public update() {
    this.decreaseSellIn();
    this.increaseQuality(this.item.sellIn < 0 ? 2 : 1);
  }
}

class BackstagePassItemUpdater extends ItemUpdater {
  public update() {
    this.decreaseSellIn();
    if (this.item.sellIn < 0) {
      this.item.quality = 0;
      return
    }

    if (this.item.sellIn < 5) {
      this.increaseQuality(3);
    } else if (this.item.sellIn < 10) {
      this.increaseQuality(2);
    } else {
      this.increaseQuality();
    }
  }
}

class SulfurasItemUpdater extends ItemUpdater {
  public update() {
    // Sulfuras does not change in quality or sellIn
  }
}

class ConjuredItemUpdater extends ItemUpdater {
  public update() {
    this.decreaseSellIn();
    this.decreaseQuality(this.item.sellIn < 0 ? 4 : 2);
  }
}

class ItemUpdaterFactory {
  static createItemUpdater(item: Item): ItemUpdater {
    const { name } = item;
    switch (name) {
      case 'Aged Brie':
        return new AgedBrieItemUpdater(item);
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstagePassItemUpdater(item);
      case 'Sulfuras, Hand of Ragnaros':
        return new SulfurasItemUpdater(item);
      case 'Conjured Mana Cake':
        return new ConjuredItemUpdater(item);
      default:
        return new NormalItemUpdater(item);
    }
  }
}
export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items
  }

  updateQuality() {
    this.items.forEach(item => {
      const itemUpdater = ItemUpdaterFactory.createItemUpdater(item);
      itemUpdater.update();
    });

    return this.items;
  }
}
