export abstract class Item {
  name: string;
  sellIn: number;
  quality: number;

  protected constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  public update(): void {
    this.updateItem();
    this.clampQuality();
  };

  protected abstract updateItem(): void;

  protected clampQuality() {
    this.quality = Math.max(0, Math.min(50, this.quality));
  }

  static createItem(name: string, sellIn: number, quality: number): Item {
    switch (name) {
      case 'Aged Brie':
        return new AgedBrieItem(sellIn, quality);
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstagePassItem(sellIn, quality);
      case 'Sulfuras, Hand of Ragnaros':
        return new SulfurasItem(sellIn, quality);
      case 'Conjured Mana Cake':
        return new ConjuredItem(sellIn, quality);
      default:
        return new NormalItem(name, sellIn, quality);
    }
  }
}

export class NormalItem extends Item {
  protected override updateItem() {
    this.sellIn--;
    this.quality -= (this.sellIn < 0) ? 2 : 1;
  }
}

export class AgedBrieItem extends Item {
  constructor(sellIn: number, quality: number) {
    super('Aged Brie', sellIn, quality);
  }

  protected override updateItem() {
    this.sellIn--;
    this.quality += (this.sellIn < 0) ? 2 : 1;
  }
}

export class BackstagePassItem extends Item {
  constructor(sellIn: number, quality: number) {
    super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);
  }

  protected override updateItem() {
    this.sellIn--;
    if (this.sellIn < 0) {
      this.quality = 0;
      return;
    }
    if (this.sellIn < 5) {
      this.quality += 3;
    } else if (this.sellIn < 10) {
      this.quality += 2;
    } else {
      this.quality += 1;
    }
  }
}

export class SulfurasItem extends Item {
  constructor(sellIn: number, quality: number) {
    super('Sulfuras, Hand of Ragnaros', sellIn, quality);
  }

  protected override updateItem() {
    // Sulfuras does not change in quality or sellIn
  }
  protected override clampQuality() {
    // Sulfuras does not change in quality or sellIn
  }
}

export class ConjuredItem extends Item {
  constructor(sellIn: number, quality: number) {
    super('Conjured Mana Cake', sellIn, quality);
  }

  protected override updateItem() {
    this.sellIn--;
    this.quality -= (this.sellIn < 0) ? 4 : 2;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      item.update();
    });

    return this.items;
  }
}
