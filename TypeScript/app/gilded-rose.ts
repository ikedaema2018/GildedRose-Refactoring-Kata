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
  abstract updateQuality(): void;

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
  public updateQuality() {
    this.decreaseSellIn();
    this.decreaseQuality(this.item.sellIn < 0 ? 2 : 1);
  }
}

class AgedBrieItemUpdater extends ItemUpdater {
  public updateQuality() {
    this.decreaseSellIn();
    this.increaseQuality(this.item.sellIn < 0 ? 2 : 1);
  }
}

class BackstagePassItemUpdater extends ItemUpdater {
  public updateQuality() {
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
  public updateQuality() {
    // Sulfuras does not change in quality or sellIn
  }
}

class ItemUpdaterFactory {
  static createItem(item: Item): ItemUpdater {
    const { name } = item;
    switch (name) {
      case 'Aged Brie':
        return new AgedBrieItemUpdater(item);
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstagePassItemUpdater(item);
      case 'Sulfuras, Hand of Ragnaros':
        return new SulfurasItemUpdater(item);
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
      const itemUpdater = ItemUpdaterFactory.createItem(item);
      itemUpdater.updateQuality();
    });

    return this.items;
  }
}
