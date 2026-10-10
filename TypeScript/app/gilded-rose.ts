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

abstract class UpdatableItem {
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
class NormalItem extends UpdatableItem {
  public updateQuality() {
    this.decreaseSellIn();
    this.decreaseQuality(this.item.sellIn < 0 ? 2 : 1);
  }
}

class AgedBrieItem extends UpdatableItem {
  public updateQuality() {
    this.decreaseSellIn();
    this.increaseQuality(this.item.sellIn < 0 ? 2 : 1);
  }
}

class BackstagePassItem extends UpdatableItem {
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

class SulfurasItem extends UpdatableItem {
  public updateQuality() {
    // Sulfuras does not change in quality or sellIn
  }
}

class ItemFactory {
  static createItem(item: Item): UpdatableItem {
    const { name } = item;
    switch (name) {
      case 'Aged Brie':
        return new AgedBrieItem(item);
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstagePassItem(item);
      case 'Sulfuras, Hand of Ragnaros':
        return new SulfurasItem(item);
      default:
        return new NormalItem(item);
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
      const updatableItem = ItemFactory.createItem(item);
      updatableItem.updateQuality();
    });

    return this.items;
  }
}
